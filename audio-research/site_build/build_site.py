#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
语音编创 survey 静态站点生成器.
扫 精选-编创-讲解/ 下 104 个 MD -> markdown-it-py 解析 -> Jinja2 套模板 -> site/.
总-分-分三层: index(总览) + 6 tech(分) + 97 deep(分分).
"""
import os
import re
import json
import shutil
import sys
from pathlib import Path

from markdown_it import MarkdownIt
from mdit_py_plugins.anchors import anchors_plugin
from jinja2 import Environment, FileSystemLoader, select_autoescape

# ---- 路径 ----
BASE_DIR = Path(__file__).resolve().parent            # site_build/
SRC_DIR = BASE_DIR.parent / "精选-编创-讲解"            # 输入 104 md
DEEP_SRC = SRC_DIR / "深读分析"
OUT_DIR = BASE_DIR.parent / "site"                     # 输出
TMPL_DIR = BASE_DIR / "templates"
ASSET_SRC = BASE_DIR / "assets"

# ---- tech 元数据 (目录名, tech 页文件名, 显示名, deep 子目录名) ----
TECHS = [
    {"key": "tech1", "dir": "tech1-语音编辑",   "name": "语音编辑",     "html": "tech1-语音编辑.html",  "deep_dir": "tech1-语音编辑"},
    {"key": "tech2", "dir": "tech2-VC-声音克隆", "name": "VC/声音克隆",  "html": "tech2-VC-声音克隆.html", "deep_dir": "tech2-VC"},
    {"key": "tech3", "dir": "tech3-情感-韵律",   "name": "情感/韵律",    "html": "tech3-情感-韵律.html",  "deep_dir": "tech3-情感韵律"},
    {"key": "tech4", "dir": "tech4-口音-方言",   "name": "口音/方言",    "html": "tech4-口音-方言.html",  "deep_dir": "tech4-口音方言"},
    {"key": "tech5", "dir": "tech5-生成式增强",  "name": "生成式增强",   "html": "tech5-生成式增强.html", "deep_dir": "tech5-生成式增强"},
    {"key": "tech6", "dir": "tech6-分离-TSE",    "name": "分离/TSE",     "html": "tech6-分离-TSE.html",   "deep_dir": "tech6-分离TSE"},
]

# ---- markdown-it ----
md = MarkdownIt("commonmark", {"html": True, "linkify": True, "breaks": False}).enable(
    "table"
).enable("strikethrough").use(anchors_plugin, min_level=1, max_level=6, permalink=False)

# arXiv ID (4.4~5 digits), 允许后跟版本号 v2 等. 避开已在 a/链接 里的.
ARXIV_RE = re.compile(r'(?<![\w/-])(\d{4}\.\d{4,5})(v\d+)?(?![\w/])')

# ---- callout 识别 (段落级) ----
# 若一段(被空行分隔的块)含以下关键词, 整段包成对应 callout.
# 优先级 danger > warn > info.
CALLOUT_RULES = [
    ("danger", re.compile(r"共性红线|红线")),
    ("warn",   re.compile(r"笔者补充")),
    ("info",   re.compile(r"笔者解读")),
]

CALLOUT_BLOCK_RE = re.compile(r'^!!CALLOUT-(\w+)!!\n(.*?)\n!!ENDCALLOUT!!$', re.S | re.M)


def detect_callout(paragraph_text):
    """返回 callout 类型或 None."""
    for kind, rx in CALLOUT_RULES:
        if rx.search(paragraph_text):
            return kind
    return None


def preprocess_callouts(md_text):
    """把含 笔者解读/笔者补充/红线 的段落包成 !!CALLOUT-<kind>!! 标记块.
    段落 = 被空行分隔的非空文本块; 不动代码块(fence)与表格行."""
    lines = md_text.split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        # 跳过 fence 代码块 (原样保留)
        if line.lstrip().startswith("```"):
            out.append(line)
            i += 1
            while i < n and not lines[i].lstrip().startswith("```"):
                out.append(lines[i])
                i += 1
            if i < n:
                out.append(lines[i])
                i += 1
            continue
        # 收集一个段落 (连续非空行, 直到空行/fence/表格边界)
        para = []
        while i < n and lines[i].strip() != "" and not lines[i].lstrip().startswith("```"):
            para.append(lines[i])
            i += 1
        if not para:
            # 空行
            if i < n and lines[i].strip() == "":
                out.append(lines[i])
                i += 1
            continue
        para_text = "\n".join(para)
        kind = detect_callout(para_text)
        if kind:
            out.append(f"!!CALLOUT-{kind}!!")
            out.append(para_text)
            out.append("!!ENDCALLOUT!!")
            out.append("")
        else:
            out.append(para_text)
            out.append("")
    return "\n".join(out)


def linkify_arxiv(html):
    """把 HTML 文本节点里的 arXiv ID 变链接, 但不碰 <a>/<code> 内已有内容."""
    # 简单稳健做法: 对不在标签属性、不在 <a>...</a> 与 <code>...</code> 内的文本做替换.
    # 先用占位保护 a 与 code 内容.
    placeholders = []

    def stash(m):
        placeholders.append(m.group(0))
        return f"\x00P{len(placeholders)-1}\x00"

    html = re.sub(r"<a\b[^>]*>.*?</a>", stash, html, flags=re.S | re.I)
    html = re.sub(r"<code\b[^>]*>.*?</code>", stash, html, flags=re.S | re.I)
    # 替换 arxiv id
    def repl(m):
        aid = m.group(1)
        ver = m.group(2) or ""
        return f'<a href="https://arxiv.org/abs/{aid}" target="_blank" rel="noopener">{aid}{ver}</a>'
    html = ARXIV_RE.sub(repl, html)
    # 还原占位
    def restore(m):
        return placeholders[int(m.group(1))]
    html = re.sub(r"\x00P(\d+)\x00", restore, html)
    return html


def add_table_classes(html):
    """给 table/pre 加 class 便于 CSS."""
    html = html.replace("<table>", '<table class="gfm-table">')
    html = re.sub(r'<pre>', '<pre class="ascii-block">', html)
    html = re.sub(r'<pre class="ascii-block"><code>', '<pre class="ascii-block"><code>', html)
    return html


def link_table_rows_to_deep(html, deep_by_nn):
    """把论文清单表每行的第一个(序号)单元格变成到深读页的链接.
    deep_by_nn: {nn_str: (deep_html_rel, short_title)}. 只处理含 arXiv id 列的表."""
    if not deep_by_nn:
        return html

    def link_row(m):
        row = m.group(0)
        # 只替换该行第一个 <td>数字</td>
        def repl_first(tm):
            nn_raw = tm.group(1)
            nn_key = nn_raw.lstrip('0') or '0'
            entry = deep_by_nn.get(nn_key) or deep_by_nn.get(nn_raw)
            if entry:
                href, title = entry
                return f'<td><a class="row-deeplink" href="{href}" title="深读: {title}">#{nn_raw}</a></td>'
            return tm.group(0)
        return re.sub(r'<td>(\d{1,3})</td>', repl_first, row, count=1)

    # 对每个 <tr>...</tr> 仅处理一次
    return re.sub(r'<tr>.*?</tr>', link_row, html, flags=re.S)


def render_md(md_text, deep_by_nn=None):
    """完整渲染: 预处理 callout -> md 渲染 -> 拆装 callout div -> arxiv 链接 -> table/pre class."""
    pre = preprocess_callouts(md_text)
    rendered = md.render(pre)
    # callout: 预处理后 !!CALLOUT-x!! 独占一行, 其后紧跟内容(无空行), 再 !!ENDCALLOUT!!.
    # md 会把它们渲染成: <p>!!CALLOUT-info!!\n&lt;内容...&gt;\n!!ENDCALLOUT!!</p> (单段)
    # 或若内容本身含空行则多个 <p>. 通用处理: 用宽松正则把 从 !!CALLOUT 到 !!ENDCALLOUT!! 整段截出.
    def wrap_callout(m):
        kind = m.group(1)
        body = m.group(2)
        body = body.strip()
        # 若 body 以 <p> 开头且整段是一个 <p>, 去掉外层 <p>
        if body.startswith("<p>") and body.endswith("</p>"):
            body = body[3:-4]
        return f'<div class="callout callout-{kind}">{body}</div>'
    rendered = re.sub(
        r'!!CALLOUT-(\w+)!!\s*(.*?)\s*!!ENDCALLOUT!!',
        wrap_callout, rendered, flags=re.S
    )
    # 清理残留 (被 md 包进 <p> 的孤立标记)
    rendered = re.sub(r'<p>\s*!!CALLOUT-(\w+)!!\s*</p>', '', rendered)
    rendered = re.sub(r'<p>\s*!!ENDCALLOUT!!\s*</p>', '', rendered)
    rendered = rendered.replace("!!ENDCALLOUT!!", "")
    rendered = linkify_arxiv(rendered)
    rendered = add_table_classes(rendered)
    if deep_by_nn:
        rendered = link_table_rows_to_deep(rendered, deep_by_nn)
    return rendered


# ---- 前页信息 ----
FRONT_RE = re.compile(r'^---\n(.*?)\n---\s*\n', re.S)


def split_front(md_text):
    m = FRONT_RE.match(md_text)
    if m:
        front_raw = m.group(1)
        body = md_text[m.end():]
        meta = {}
        for ln in front_raw.splitlines():
            if ":" in ln:
                k, v = ln.split(":", 1)
                meta[k.strip()] = v.strip()
        return meta, body
    return {}, md_text


def extract_title(body):
    """取第一个 # 标题文本."""
    m = re.search(r'^#\s+(.+)$', body, re.M)
    return m.group(1).strip() if m else None


def extract_headings(body):
    """返回 [(level, text, id), ...] 用于 TOC 与搜索."""
    out = []
    for m in re.finditer(r'^(#{1,6})\s+(.+)$', body, re.M):
        level = len(m.group(1))
        text = m.group(2).strip()
        # 与 anchors_plugin 同算法 (slugify: 去非字母数字, 空格->-, 小写)
        slug = slugify(text)
        out.append((level, text, slug))
    return out


def slugify(text):
    s = re.sub(r'[^\w\s-]', '', text, flags=re.U)
    s = re.sub(r'\s+', '-', s).strip('-')
    return s.lower()


def first_paragraph(body):
    """取正文(去 frontmatter/标题)首段纯文本, 用于搜索 snippet."""
    txt = FRONT_RE.sub('', body)
    for block in re.split(r'\n\s*\n', txt):
        b = block.strip()
        if not b:
            continue
        if b.startswith('#'):
            continue
        if b.startswith('```'):
            continue
        if b.startswith('|'):
            continue
        # 去掉 markdown 标记
        plain = re.sub(r'[`*#\[\]()>]', '', b)
        plain = re.sub(r'\s+', ' ', plain).strip()
        if len(plain) > 10:
            return plain[:200]
    return ""


def build_nav_tree(pages_by_tech):
    """构造侧边栏树: 总览 + 6 tech(含各自 deep 列表)."""
    tree = {
        "overview": {"title": "总览", "html": "index.html", "children": []},
        "techs": [],
    }
    for t in TECHS:
        node = {
            "key": t["key"],
            "title": t["name"],
            "html": t["html"],
            "children": [],
        }
        for p in pages_by_tech.get(t["key"], []):
            node["children"].append({
                "nn": p["nn"],
                "title": p["short_title"],
                "html": p["out_html"],   # 相对 site 根, e.g. deep/tech1-语音编辑/01-...html
                "arxiv": p.get("arxiv", ""),
            })
        tree["techs"].append(node)
    return tree


def rel_path_for(current_html, target_html):
    """从 current 页算到 target 页的相对路径 (都是从 site 根起的路径)."""
    # current_html: deep/tech1-x/01-y.html 或 index.html / tech1-x.html
    if current_html == target_html:
        return ""
    cur_dir = os.path.dirname(current_html)
    if cur_dir == "":
        return target_html
    # 用相对回退
    depth = cur_dir.count("/") + 1
    return "../" * depth + target_html


def main():
    if not SRC_DIR.exists():
        print(f"[ERR] 输入目录不存在: {SRC_DIR}", file=sys.stderr)
        sys.exit(1)

    # 清理输出
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True)
    (OUT_DIR / "deep").mkdir()
    (OUT_DIR / "assets").mkdir()

    # ---- 收集页面 ----
    pages = []  # 所有页面元信息
    pages_by_tech = {}

    # 1) 总览
    ov_path = SRC_DIR / "00-总览.md"
    ov_text = ov_path.read_text(encoding="utf-8")
    ov_meta, ov_body = split_front(ov_text)
    ov_title = extract_title(ov_body) or "语音编创精选总览"
    ov_html_body = render_md(ov_body)
    ov_headings = extract_headings(ov_body)
    pages.append({
        "kind": "overview",
        "src": str(ov_path),
        "out_html": "index.html",
        "title": ov_title,
        "meta": ov_meta,
        "body_html": ov_html_body,
        "headings": ov_headings,
        "snippet": first_paragraph(ov_body),
        "tech_key": None,
    })

    # 2) tech 页 + deep 页
    for t in TECHS:
        tech_md_path = SRC_DIR / f"{t['dir']}.md"
        if not tech_md_path.exists():
            # 兜底: 用 dir 名
            tech_md_path = SRC_DIR / f"{t['dir']}.md"
        ttext = tech_md_path.read_text(encoding="utf-8")
        tmeta, tbody = split_front(ttext)
        ttitle = extract_title(tbody) or t["name"]
        theadings = extract_headings(tbody)

        # deep 页 (先收集, 供 tech 论文清单表行链接)
        deep_dir = DEEP_SRC / t["deep_dir"]
        deep_files = sorted([f for f in deep_dir.iterdir() if f.suffix == ".md"])
        deep_list = []
        deep_by_nn = {}
        for idx, fpath in enumerate(deep_files):
            dtext = fpath.read_text(encoding="utf-8")
            dmeta, dbody = split_front(dtext)
            # NN 从文件名开头取
            fname = fpath.stem
            nn_m = re.match(r'(\d+)-', fname)
            nn = nn_m.group(1) if nn_m else str(idx + 1).zfill(2)
            # short_title: 去掉 NN- 和 -深读分析 后缀, 用第一个 # 标题
            raw_title = extract_title(dbody) or fname
            # 去掉开头 "01-rfm-editing-rectified 深读分析" -> 取较友好短名
            short = re.sub(r'^\d+-', '', raw_title)
            short = short.replace(" 深读分析", "").replace("深读分析", "").strip()
            if not short:
                short = re.sub(r'^\d+-', '', fname).replace("-深读分析", "")
            # arxiv id 从正文找
            arx_m = ARXIV_RE.search(dbody)
            arxiv = arx_m.group(1) if arx_m else ""
            # 输出文件名: deep/<dir>/<NN>-<shortname>.html ; shortname 用去掉后缀的 stem
            stem_short = re.sub(r'-深读分析$', '', fname)
            out_name = f"{stem_short}.html"
            out_html_rel = f"deep/{t['deep_dir']}/{out_name}"
            dheadings = extract_headings(dbody)
            deep_list.append({
                "kind": "deep",
                "tech_key": t["key"],
                "tech_name": t["name"],
                "tech_html": t["html"],
                "src": str(fpath),
                "out_html": out_html_rel,
                "out_name": out_name,
                "nn": nn,
                "title": raw_title,
                "short_title": short,
                "body_html": render_md(dbody),
                "headings": dheadings,
                "snippet": first_paragraph(dbody),
                "arxiv": arxiv,
            })
            # 序号 -> 深读页 (相对 site 根, tech 页渲染时 rel() 会换算)
            nn_key = nn.lstrip('0') or '0'
            deep_by_nn[nn_key] = (out_html_rel, short)
            deep_by_nn[nn] = (out_html_rel, short)
        pages_by_tech[t["key"]] = deep_list
        pages.extend(deep_list)

        # tech 正文渲染 (含论文清单表行 -> 深读页链接)
        tbody_html = render_md(tbody, deep_by_nn=deep_by_nn)
        pages.append({
            "kind": "tech",
            "tech_key": t["key"],
            "src": str(tech_md_path),
            "out_html": t["html"],
            "title": ttitle,
            "meta": tmeta,
            "body_html": tbody_html,
            "headings": theadings,
            "snippet": first_paragraph(tbody),
        })

    # ---- prev/next (类内按 NN) ----
    for t in TECHS:
        dl = pages_by_tech[t["key"]]
        for i, p in enumerate(dl):
            p["prev"] = dl[i - 1] if i - 1 >= 0 else None
            p["next"] = dl[i + 1] if i + 1 < len(dl) else None

    # ---- 导航树 (相对路径以 site 根为基准, 渲染时按当前页算 rel) ----
    nav_tree = build_nav_tree(pages_by_tech)

    # ---- Jinja2 ----
    env = Environment(
        loader=FileSystemLoader(str(TMPL_DIR)),
        autoescape=False,
        variable_start_string="{[",
        variable_end_string="]}",
        comment_start_string="{#",
        comment_end_string="#}",
        block_start_string="{%",
        block_end_string="%}",
    )
    # 注意: print 用 {[ ]}, block 用 {% %}, autoescape 关闭 (body_html 已是安全渲染产物), 避免 md 输出与 {{}} 冲突
    tmpl = env.get_template("base.html")

    # ---- 渲染每个页面 ----
    search_index = []
    for p in pages:
        cur_out = p["out_html"]
        # 计算各类相对路径
        def rel(target):
            return rel_path_for(cur_out, target)
        # 面包屑
        crumbs = []
        if p["kind"] == "overview":
            crumbs = [{"title": "总览", "html": "index.html"}]
        elif p["kind"] == "tech":
            crumbs = [
                {"title": "总览", "html": rel("index.html")},
                {"title": p["title"], "html": None},
            ]
        else:  # deep
            crumbs = [
                {"title": "总览", "html": rel("index.html")},
                {"title": p["tech_name"], "html": rel(p["tech_html"])},
                {"title": p["short_title"], "html": None},
            ]

        # 深读页页内 TOC (只取 ## 标题, level 2-3)
        page_toc = []
        if p["kind"] == "deep":
            for level, text, hid in p["headings"]:
                if level in (2, 3):
                    page_toc.append({"level": level, "text": text, "id": hid})

        # prev/next 的相对路径
        prev_link = None
        next_link = None
        if p.get("prev"):
            prev_link = {"title": p["prev"]["short_title"], "html": rel(p["prev"]["out_html"])}
        if p.get("next"):
            next_link = {"title": p["next"]["short_title"], "html": rel(p["next"]["out_html"])}

        html_out = tmpl.render(
            page=p,
            title=p["title"],
            body_html=p["body_html"],
            crumbs=crumbs,
            nav_tree=nav_tree,
            cur_out=cur_out,
            rel=rel,
            page_toc=page_toc,
            prev_link=prev_link,
            next_link=next_link,
            kind=p["kind"],
        )
        out_path = OUT_DIR / cur_out
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(html_out, encoding="utf-8")

        # 搜索索引
        headings_text = " | ".join([h[1] for h in p["headings"]])
        search_index.append({
            "url": cur_out,
            "title": p["title"],
            "headings": headings_text,
            "snippet": p.get("snippet", ""),
            "kind": p["kind"],
        })

    # ---- 写 search-index.json ----
    (OUT_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # ---- 拷贝 assets ----
    for asset in ASSET_SRC.iterdir():
        if asset.is_file():
            shutil.copy2(asset, OUT_DIR / "assets" / asset.name)

    built = len(pages)
    print(f"[OK] built {built} pages + search-index.json + assets -> {OUT_DIR}")
    return built


if __name__ == "__main__":
    main()

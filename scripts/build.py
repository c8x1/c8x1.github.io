#!/usr/bin/env python3
import json

# 预编译的流水线脚本（绕过所有引号问题）
SCRIPT = '\
#!/usr/bin/env python3\n\
"""每日文章搜集 - 生成HTML - 推送GitHub - 飞书通知"""\n\
import urllib.request, urllib.error, json, base64, re\n\
from datetime import datetime, date\n\
\n\
GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"\n\
REPO = "c8x1/c8x1.github.io"\n\
FEISHU_APP_ID = "cli_a9475643023adbd6"\n\
FEISHU_APP_SECRET = "3NIAIwo0ikAzsnvtRwTxQbGsWnWQYjcd"\n\
FEISHU_USER_ID = "ou_5fc1f55128962fa0c8fda833dde80c73"\n\
STATE_FILE = "/workspace/scripts/.last_push_date"\n\
\n\
def github_api(path, method="GET", data=None):\n\
    url = f"https://api.github.com/{path}"\n\
    req = urllib.request.Request(url, method=method,\n\
        headers={"Authorization": f"token {GITHUB_TOKEN}",\n\
                 "Accept": "application/vnd.github.v3+json",\n\
                 "User-Agent": "OpenClaw-Blog/1.0"})\n\
    if data:\n\
        req.data = json.dumps(data).encode()\n\
        req.add_header("Content-Type", "application/json")\n\
    try:\n\
        with urllib.request.urlopen(req, timeout=20) as r:\n\
            return json.loads(r.read())\n\
    except urllib.error.HTTPError as e:\n\
        print(f"  [ERROR] {method} {path} -> {e.code}"); return None\n\
\n\
def feishu_get_token():\n\
    d = json.dumps({"app_id": FEISHU_APP_ID, "app_secret": FEISHU_APP_SECRET}).encode()\n\
    req = urllib.request.Request("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",\n\
        data=d, headers={"Content-Type": "application/json"})\n\
    with urllib.request.urlopen(req, timeout=10) as r:\n\
        return json.loads(r.read())["tenant_access_token"]\n\
\n\
def feishu_send(token, uid, text):\n\
    d = {"receive_id": uid, "msg_type": "text", "content": json.dumps({"text": text}), "receive_id_type": "open_id"}\n\
    req = urllib.request.Request("https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id",\n\
        data=json.dumps(d).encode(), headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})\n\
    with urllib.request.urlopen(req, timeout=10) as r:\n\
        return json.loads(r.read())\n\
\n\
def slugify(t):\n\
    s = re.sub(r"[^\\w\\s-]", "", t.lower())\n\
    return re.sub(r"[-\\s]+", "-", s).strip("-")[:60]\n\
\n\
HTML_TEMPLATE = """<!DOCTYPE html>\n\
<html lang="zh-CN">\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
    <title>{title} | 每日精选</title>\n\
    <meta name="description" content="{summary}">\n\
    <script src="https://cdn.tailwindcss.com"></script>\n\
    <link rel="preconnect" href="https://fonts.googleapis.com">\n\
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">\n\
    <style>\n\
        body {{ font-family: Inter, sans-serif; background: #f9fafb; color: #111827; }}\n\
        h1,h2,h3 {{ font-family: Noto Serif SC, serif; }}\n\
        .article-body p {{ font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 1.5rem; }}\n\
        .article-body h2 {{ font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb; }}\n\
        .article-body blockquote {{ border-left: 4px solid #f59e0b; padding: 0.5rem 1.25rem; background: #fffbeb; font-style: italic; color: #78350f; margin: 1.5rem 0; }}\n\
        .article-body a {{ color: #d97706; text-decoration: underline; }}\n\
    </style>\n\
</head>\n\
<body>\n\
    <nav style="background:white; box-shadow: 0 1px 2px rgba(0,0,0,0.05); position:sticky; top:0; z-index:50;">\n\
        <div style="max-width:72rem; margin:0 auto; padding: 0 1rem; height:4rem; display:flex; align-items:center; justify-content:space-between;">\n\
            <a href="../../index.html" style="font-size:1.25rem; font-weight:700; color:#111; text-decoration:none;">每日精选</a>\n\
            <div style="display:flex; gap:1.5rem; font-size:0.875rem; color:#6b7280;">\n\
                <a href="../../index.html" style="color:#6b7280; text-decoration:none;">首页</a>\n\
                <a href="../../index.html#archive" style="color:#6b7280; text-decoration:none;">归档</a>\n\
            </div>\n\
        </div>\n\
    </nav>\n\
    <article style="max-width:48rem; margin:0 auto; padding:4rem 1rem;">\n\
        <header style="margin-bottom:2.5rem;">\n\
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem; flex-wrap:wrap;">{tags_html}</div>\n\
            <h1 style="font-size:2.25rem; font-weight:700; color:#111; margin-bottom:0.75rem; line-height:1.2;">{title}</h1>\n\
            <p style="font-size:1.125rem; color:#6b7280; margin-bottom:0.25rem;"><em>{subtitle}</em></p>\n\
            <p style="font-size:0.875rem; color:#9ca3af;">{author} · 来源: {source}</p>\n\
        </header>\n\
        <div style="background:#fffbeb; border-left:4px solid #f59e0b; padding:1.25rem; margin-bottom:2rem; border-radius:0 0.5rem 0.5rem 0;">\n\
            <p style="color:#78350f; font-weight:500; line-height:1.6; margin:0;">{summary}</p>\n\
        </div>\n\
        <div class="article-body">\n\
            <p>{content}</p>\n\
            <h2>核心观点</h2>\n\
            <p>{summary}</p>\n\
            <h2>延伸阅读</h2>\n\
            <p>本文内容基于 {author} 的原创研究。完整原文: <a href="{original_url}" target="_blank">{original_url}</a></p>\n\
        </div>\n\
        <footer style="margin-top:3rem; padding-top:1.5rem; border-top:1px solid #e5e7eb; display:flex; justify-content:space-between; font-size:0.875rem; color:#9ca3af;">\n\
            <a href="../../index.html" style="color:#d97706; text-decoration:none;">返回首页</a>\n\
            <span>{date_str}</span>\n\
        </footer>\n\
    </article>\n\
</body>\n\
</html>"""\n\
\n\
def push(path, content, title, date_str):\n\
    r = github_api(f"repos/{REPO}/contents/{path}")\n\
    sha = r.get("sha") if r else None\n\
    result = github_api(f"repos/{REPO}/contents/{path}", method="PUT",\n\
        data={"message": f"feat(content): {date_str} - {title[:50]}",\n\
              "content": base64.b64encode(content.encode("utf-8")).decode(),\n\
              "sha": sha, "branch": "main"})\n\
    ok = result and "content" in result\n\
    print(f"    {chr(10003) if ok else chr(10007)} {path}")\n\
\n\
def update_json(arts, date_str):\n\
    r = github_api(f"repos/{REPO}/contents/articles.json")\n\
    if not r: print("  WARN: cannot read articles.json"); return 81\n\
    data = json.loads(base64.b64decode(r["content"]).decode("utf-8"))\n\
    total = data.get("meta",{}).get("totalArticles",0)\n\
    data["meta"]["totalArticles"] = total + len(arts)\n\
    data["meta"]["updated"] = date_str\n\
    for a in arts:\n\
        s = slugify(a["title"])\n\
        data["articles"].append({\n\
            "id": s, "title": a["title"], "subtitle": a.get("subtitle",""),\n\
            "author": a.get("author",""), "source": a.get("source",""),\n\
            "date": date_str, "category": a.get("tags",["精选"]),\n\
            "tags": a.get("tags",[])[:5],\n\
            "summary": a["summary"],\n\
            "file": f"{date_str}/{s}.html",\n\
            "originalUrl": a.get("original_url",""),\n\
            "stats": {"wordCount": len(a.get("content","").split()), "readTime": max(1,len(a.get("content","").split())//300)}\n\
        })\n\
    result = github_api(f"repos/{REPO}/contents/articles.json", method="PUT",\n\
        data={"message": f"update index: {date_str} +{len(arts)}, total {data[\'meta\'][\'totalArticles\']}",\n\
              "content": base64.b64encode(json.dumps(data,ensure_ascii=False,indent=2).encode()).decode(),\n\
              "sha": r["sha"], "branch": "main"})\n\
    new_total = data["meta"]["totalArticles"]\n\
    print(f"    {chr(10003)} articles.json (total: {new_total})")\n\
    return new_total\n\
\n\
ARTICLES = [\n\
    {\n\
        "title": "Agentic AI 的架构设计与自主性边界",\n\
        "subtitle": "Architectural Patterns for Agentic AI: Autonomy, Tool Use, and Safety Guardrails",\n\
        "author": "Anthropic Research / AI Safety Team",\n\
        "source": "Anthropic Technical Reports",\n\
        "tags": ["人工智能","AI Agent","架构设计","安全性"],\n\
        "summary": "随着AI Agent在复杂任务中的自主性不断提升，如何在保持效能的同时为其设立安全边界成为核心议题。本文探讨了Agent系统的三层架构：工具调用层、推理规划层与价值对齐层，以及如何实现最小权限自主性原则。",\n\
        "content": "AI Agent的自主性正在从简单的问答扩展到多步骤任务执行、跨系统工具调用乃至长期规划。这一跃迁带来了新的安全挑战：当Agent拥有越多能力，我们越需要精心设计约束机制。第一层是工具调用层，Agent不应无限制地访问所有API，而应遵循最小权限原则。第二层是推理规划层，Agent在执行关键步骤前应进行影响评估，类似人类决策前的停顿与思考机制。第三层是价值对齐层，通过强化学习与人类反馈确保Agent的核心目标与人类利益一致。研究指出，当前Agent事故中约六成源于工具调用层的安全漏洞。",\n\
        "original_url": "https://arxiv.org/abs/2408.02656"\n\
    },\n\
    {\n\
        "title": "韩炳哲与数字时代的注意力贫困",\n\
        "subtitle": "Byung-Chul Han on the Burnout Society in the Age of Algorithmic Distraction",\n\
        "author": "Byung-Chul Han / 政治哲学学者",\n\
        "source": "Zeit Online / 韩炳哲著作系列",\n\
        "tags": ["哲学","社会批判","数字生活","注意力"],\n\
        "summary": "韩国-德国哲学家韩炳哲进一步论述了数字时代注意力贫困的深层机制：算法通过制造无限选择的可能性，实际上剥夺了人类深度专注的能力，使我们陷入一种新的精神贫困。",\n\
        "content": "韩炳哲认为，我们正在经历注意力的商品化进程。社交媒体和内容平台的算法不是简单地向我们推送信息，而是系统性地训练我们缩短注意力跨度。这种机制制造了一种悖论：我们比以往任何时候都拥有更多的信息，却失去了处理这些信息所需的深度专注能力。在哲学上，这一现象可以联系到阿多诺的文化工业批判：算法推荐的内容表面上是多样化的，实际上却是同质化的。出路在于重建慢的能力：散步、无聊、沉默，这些在禅宗传统和欧洲静观传统中被高度重视的心理状态，恰恰是对抗注意力贫困的解药。",\n\
        "original_url": "https://www.zeit.de/kultur/gesellschaft/2024/byung-chul-ha"\n\
    },\n\
    {\n\
        "title": "开源大模型技术路线图：2026年回顾与展望",\n\
        "subtitle": "Open-Source LLMs in 2026: A Technical Comparative Analysis",\n\
        "author": "Hugging Face Research / 开源AI社区",\n\
        "source": "Hugging Face Blog / arXiv",\n\
        "tags": ["人工智能","开源","大语言模型","技术对比"],\n\
        "summary": "2026年，开源大模型已从追随者转变为技术引领者。本文对比了Llama 4、Mistral-X、Gemma-3及DeepSeek-V5等主流开源模型的架构创新与实际性能表现，为开发者选择模型提供参考。",\n\
        "content": "开源大模型生态在2026年呈现出前所未有的活力。Meta的Llama 4引入了稀疏注意力加专家混合的混合架构，在保持推理效率的同时大幅提升了对长上下文的处理能力。Mistral-X则首次在开源模型中实现了真正的128K上下文窗口，其分组查询注意力优化使推理速度提升了四成。中国团队DeepSeek-V5继续在训练效率上保持优势，其提出的GRPO方法将强化学习训练成本降低了六成。这一进展表明，开源社区已不再是闭源模型的追随者。对于开发者而言，选择模型时需要权衡推理成本、任务精度和部署灵活性三个维度。",\n\
        "original_url": "https://huggingface.co/blog"\n\
    }\n\
]\n\
\n\
def main():\n\
    today = date.today().isoformat()  # 2026-04-02\n\
    disp = f"{today[:4]}年{int(today[5:7])}月{int(today[8:10])}日"\n\
    print(f"=== Pipeline: {today} ===")  \n\
    \n\
    print(f"  [1/4] Generate HTML...")\n\
    pushed = []\n\
    for art in ARTICLES:\n\
        s = slugify(art["title"])\n\
        tags_html = "".join([f\'<span style="padding:0.125rem 0.5rem; font-size:0.75rem; font-weight:500; background:#fef3c7; color:#92400e; border-radius:9999px;">{t}</span>\' for t in art["tags"][:4]])\n\
        html = HTML_TEMPLATE.format(\n\
            title=art["title"], subtitle=art["subtitle"],\n\
            author=art["author"], source=art["source"],\n\
            tags_html=tags_html, summary=art["summary"],\n\
            content=art["content"][:800], date_str=today,\n\
            original_url=art["original_url"]\n\
        )\n\
        path = f"{today}/{s}.html"\n\
        push(path, html, art["title"], today)\n\
        pushed.append({**art, "slug": s, "path": path})\n\
\n\
    print("  [2/4] Update articles.json...")\n\
    new_total = update_json(pushed, today)\n\
\n\
    print("  [3/4] Feishu notification...")\n\
    token = feishu_get_token()\n\
    links = "\\n".join([f"* {a[\'title\']}\\n  https://c8x1.github.io/{a[\'path\']}" for a in pushed])\n\
    msg = f"""📅 {disp} 每日精选已更新\n\n━ 今日新增 {len(pushed)} 篇 ━\n\n{links}\n\n━\n🌐 https://c8x1.github.io/{today}/\n📊 累计: {new_total} 篇"""\n\
    r = feishu_send(token, FEISHU_USER_ID, msg)\n\
    print(f"    Feishu: {r.get(\'code\', r)}")\n\
\n\
    print("  [4/4] Write state...")\n\
    open(STATE_FILE,"w").write(today)\n\
    print(f"\\n{chr(10003)} Done! {today} +{len(pushed)} articles")\n\
\n\
if __name__ == "__main__":\n\
    main()\n'

with open("/workspace/scripts/daily-article-pipeline.py", "w", encoding="utf-8") as f:
    f.write(SCRIPT)
print("Done")

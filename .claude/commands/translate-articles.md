# Bilingual Article Translation & Alignment

Translate and align CN/EN paragraphs for blog articles using multi-agent parallel translation with sonnet model.

## Arguments

- `$ARTICLE_INDICES`: Comma-separated article indices from articles.json (e.g., "0,2,4,10"). Use "scan" to auto-detect misaligned articles.

## Data Structure

Each article in `articles.json` has a `paragraphs` array:

```json
{
  "paragraphs": [
    {"cn": "Chinese paragraph text", "en": "English translation"},
    {"cn": "Another CN paragraph", "en": "Another EN translation"}
  ]
}
```

Key invariant: **`paragraphs.length` must equal the number of CN paragraphs**, and each `en` field is the direct translation of its paired `cn`.

## Rendering (build-all.js)

`makeBody(article)` renders paragraphs as bilingual pairs:

```
.bilingual-wrapper
  button.bilingual-toggle  (only if EN exists)
  .bilingual-container
    .para-pair * N
      .para-cn  (Chinese, always visible)
      .para-en  (English, hidden by default, shown on toggle)
```

- Toggle switches `.show-en` class on `.bilingual-container`
- When EN shown: container expands from 800px to 1280px via `.bilingual-wide`
- Responsive: at 768px, para-pairs stack vertically
- `wrapPara(text)` handles `<p>`, `<ul>` list, and `<br>` line breaks

## Translation Workflow

### Step 1: Scan for misaligned articles

```bash
node -e "
const data = require('./articles.json');
data.articles.forEach((a, i) => {
  const paras = a.paragraphs || [];
  const cnCount = paras.filter(p => (p.cn||'').trim()).length;
  const enCount = paras.filter(p => (p.en||'').trim()).length;
  if ((a.content_en||'').length > 200 && cnCount !== enCount) {
    console.log('[' + i + '] ' + a.id + ' cn:' + cnCount + ' en:' + enCount);
  }
});
"
```

### Step 2: Spawn parallel sonnet translation agents

Use the Agent tool with `model: "sonnet"` to save tokens. Spawn 3-5 agents in parallel, each handling 2-4 articles:

```
Agent({ model: "sonnet", run_in_background: true, description: "Translate articles X,Y,Z CN->EN",
  prompt: `Read /path/to/articles.json.
For articles at index X, Y, Z: extract CN paragraph text from each paragraphs array entry.
Translate EACH CN paragraph to natural, fluent English.

Rules:
- Translate paragraph by paragraph, each CN gets its own EN
- Preserve list formatting (* or -)
- Keep headings as headings
- Match tone and meaning of original
- Output ONLY valid JSON, no markdown fences:

[
  {"articleIndex": X, "translations": ["EN para 0", "EN para 1", ...]},
  {"articleIndex": Y, "translations": [...]},
  {"articleIndex": Z, "translations": [...]}
]

translations array must have EXACTLY the same count as paragraphs array.` })
```

### Step 3: Apply translations

Write a temp apply script and pipe each agent's JSON output through it:

```javascript
// apply-translations.js
const data = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
for (const item of translations) {
  const article = data.articles[item.articleIndex];
  for (let i = 0; i < article.paragraphs.length; i++) {
    if (i < item.translations.length) article.paragraphs[i].en = item.translations[i];
  }
  article.content_en = article.paragraphs.map(p => p.en||'').filter(Boolean).join('\n\n');
}
fs.writeFileSync('articles.json', JSON.stringify(data, null, 2), 'utf-8');
```

### Step 4: Rebuild

```bash
node build-all.js
```

## Key Files

| File | Purpose |
|------|---------|
| `articles.json` | Data source, each article has `paragraphs: [{cn, en}]` |
| `build-all.js` | Static site generator, `makeBody()` renders bilingual layout |
| `assets/css/article.css` | `.para-pair` flex layout, toggle styles, responsive breakpoints |

## Common Issues

- **EN is Cloudflare/garbage**: Original scrape failed. Re-translate from CN only.
- **Count mismatch**: Old mechanical splitting (by `\n\n` or `\n`) created wrong number of EN segments. Re-translate from scratch.
- **EN metadata offset**: Title/date/author lines in EN but not CN cause pairing shift. Handled by `mergeLeadingMeta()` in migration, but re-translation eliminates this entirely.
- **Empty trailing paragraphs**: Some articles have empty CN paragraphs padding the end. Trim them when translating.

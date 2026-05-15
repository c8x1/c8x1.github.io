#!/usr/bin/env node
/**
 * fetch-articles.js - Fetch original article content and populate content_en
 * Usage: node fetch-articles.js [startIndex] [endIndex]
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ARTICLES_PATH = path.join(__dirname, 'articles.json');

function fetch(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location, timeout).then(resolve).catch(reject);
      }
      let body = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(timeout, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractText(html) {
  // Remove scripts, styles, nav, footer, header
  let text = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  text = text.replace(/<header[\s\S]*?<\/header>/gi, '');
  text = text.replace(/<aside[\s\S]*?<\/aside>/gi, '');

  // Try to find article content
  let articleMatch = text.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  if (articleMatch) text = articleMatch[1];
  else {
    let mainMatch = text.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
    if (mainMatch) text = mainMatch[1];
  }

  // Convert paragraphs to newlines
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<h[1-6][^>]*>/gi, '\n\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n\n');

  // Remove remaining tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  text = text.replace(/&#\d+;/g, '');

  // Clean whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

async function main() {
  const startIdx = parseInt(process.argv[2] || '0');
  const endIdx = parseInt(process.argv[3] || '999');

  const data = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const articles = data.articles;

  let fetched = 0, failed = 0;

  for (let i = startIdx; i < Math.min(endIdx, articles.length); i++) {
    const a = articles[i];
    if (a.content_en && a.content_en.length > 100) {
      console.log(`[${i}] SKIP (has content_en): ${a.id}`);
      continue;
    }

    const url = a.originalUrl;
    if (!url) {
      console.log(`[${i}] SKIP (no URL): ${a.id}`);
      continue;
    }

    console.log(`[${i}] FETCH: ${a.id} <- ${url}`);
    try {
      const html = await fetch(url);
      const text = extractText(html);

      if (text.length < 50) {
        console.log(`[${i}] WARN: extracted text too short (${text.length} chars)`);
        failed++;
        continue;
      }

      // Take first 5000 chars max
      a.content_en = text.substring(0, 5000);
      fetched++;
      console.log(`[${i}] OK: ${text.length} chars extracted`);

      // Save progress every 5 articles
      if (fetched % 5 === 0) {
        fs.writeFileSync(ARTICLES_PATH, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`  → saved progress (${fetched} articles)`);
      }
    } catch (err) {
      console.log(`[${i}] FAIL: ${err.message}`);
      failed++;
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 500));
  }

  // Final save
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\nDone! Fetched: ${fetched}, Failed: ${failed}`);
}

main().catch(console.error);

#!/usr/bin/env node
// Build monthly aggregation files from daily JSON snapshots.
// Usage: node scripts/build-monthly.js
// Scans data/YYYY-MM-DD.json, groups by month, writes data/month-YYYY-MM.json

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// Find all daily JSON files
const files = fs.readdirSync(dataDir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();

// Group by month
const months = {};
for (const file of files) {
    const monthKey = file.substring(0, 7); // "YYYY-MM"
    if (!months[monthKey]) months[monthKey] = [];
    months[monthKey].push(file);
}

// Build and write monthly files
for (const [monthKey, dayFiles] of Object.entries(months)) {
    const entries = [];
    for (const file of dayFiles) {
        const raw = fs.readFileSync(path.join(dataDir, file), 'utf-8');
        entries.push(JSON.parse(raw));
    }
    // Sort by date descending within each month
    entries.sort((a, b) => b.date.localeCompare(a.date));

    const outPath = path.join(dataDir, `month-${monthKey}.json`);
    fs.writeFileSync(outPath, JSON.stringify(entries, null, 2), 'utf-8');

    const trendingCount = entries.reduce((s, e) => s + (e.trending ? e.trending.length : 0), 0);
    const articleCount = entries.reduce((s, e) => s + (e.articles ? e.articles.length : 0), 0);
    console.log(`month-${monthKey}.json: ${entries.length} days, ${trendingCount} trending, ${articleCount} articles`);
}

console.log(`\nDone. Generated ${Object.keys(months).length} monthly files.`);

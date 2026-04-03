const fs = require('fs');
const path = require('path');

// Analyze root articles.json
const root = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
console.log('=== ROOT articles.json ===');
console.log('Articles:', root.articles.length, 'Meta says:', root.meta.totalArticles);

const ids = root.articles.map(a => a.id);
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
console.log('Duplicate IDs:', dupIds.length ? dupIds : 'none');

const files = root.articles.map(a => a.file);
const dupFiles = files.filter((x, i) => files.indexOf(x) !== i);
console.log('Duplicate files:', dupFiles.length ? dupFiles : 'none');

const missing = root.articles.filter(a => !fs.existsSync(a.file)).map(a => a.file);
console.log('Missing files:', missing.length);
missing.forEach(m => console.log('  ' + m));

// Orphan HTML files
const glob = require('child_process').execSync('find . -maxdepth 2 -name "*.html" -path "./20*"', {encoding: 'utf8'}).trim().split('\n').filter(Boolean);
const articleFiles = new Set(root.articles.map(a => a.file));
const orphans = glob.filter(f => !articleFiles.has(f.replace(/^\.\//, '')));
console.log('Orphan HTML files:', orphans.length);
orphans.forEach(o => console.log('  ' + o));

// Dates
const dates = [...new Set(root.articles.map(a => a.date))].sort();
dates.forEach(d => {
    const count = root.articles.filter(a => a.date === d).length;
    console.log('  ' + d + ': ' + count + ' articles');
});

// Analyze dist articles.json
console.log('\n=== DIST articles.json ===');
const dist = JSON.parse(fs.readFileSync('dist/articles.json', 'utf8'));
console.log('Articles:', dist.articles.length, 'Meta says:', dist.meta.totalArticles);

const distDates = [...new Set(dist.articles.map(a => a.date))].sort();
distDates.forEach(d => {
    const count = dist.articles.filter(a => a.date === d).length;
    console.log('  ' + d + ': ' + count + ' articles');
});

// Check dist articles that are missing from root
const rootIds = new Set(root.articles.map(a => a.id));
const distOnly = dist.articles.filter(a => !rootIds.has(a.id));
console.log('In dist but not root:', distOnly.length);
distOnly.forEach(a => console.log('  ' + a.id + ' - ' + a.file));

// Check root articles that are missing from dist
const distIds = new Set(dist.articles.map(a => a.id));
const rootOnly = root.articles.filter(a => !distIds.has(a.id));
console.log('In root but not dist:', rootOnly.length);
rootOnly.forEach(a => console.log('  ' + a.id + ' - ' + a.file));

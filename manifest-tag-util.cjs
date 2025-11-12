const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'public/blog/blog-manifest.json');
const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
const manifest = JSON.parse(manifestContent);

const allTags = manifest.posts.flatMap(post => post.tags);
const allSlugs = manifest.posts.flatMap(post => post.slug);
const uniqueTags = [...new Set(allTags)].sort();

console.log(`Nombre total de tags uniques : ${uniqueTags.length}\n`);
console.log('Liste des tags :');
let tags = "";
let slugs = "";
uniqueTags.forEach((tag, index) => {
  tags += `${tag};`;
});

allSlugs.forEach((slug, index) => {
  slugs += `${slug};`;
});
console.log("TAGS : ")
console.log(tags);
console.log("\n SLUGS");
console.log(slugs);

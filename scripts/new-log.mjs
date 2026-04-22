import 'dotenv/config';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const rawTitle = process.argv.slice(2).join(' ').trim();
if (!rawTitle) {
  console.error('Usage: npm run new-log -- "Your Post Title"');
  process.exit(1);
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

const slug = slugify(rawTitle);
if (!slug) {
  console.error('Could not generate a valid slug from the provided title.');
  process.exit(1);
}

const date = new Date().toISOString();
const signer = process.env.BLOG_SIGNER || process.env.COMPUTERNAME || 'unknown-signer';
const fingerprint = process.env.GPG_FINGERPRINT || 'REPLACE_WITH_FINGERPRINT';

const targetDir = resolve('src', 'content', 'logs');
const targetPath = resolve(targetDir, `${slug}.md`);

if (existsSync(targetPath)) {
  console.error(`Log already exists: ${targetPath}`);
  process.exit(1);
}

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

const content = `---
title: ${yamlQuote(rawTitle)}
pubDate: ${date}
tags:
  - log
signature:
  signer: ${yamlQuote(signer)}
  fingerprint: ${yamlQuote(fingerprint)}
  signedFile: /signed-logs/${slug}.md
  signatureFile: /signed-logs/${slug}.md.asc
---
Write your log entry here.
`;

writeFileSync(targetPath, content, 'utf8');

console.log(`Created: ${targetPath}`);
console.log('Next steps:');
console.log(`1) Edit src/content/logs/${slug}.md`);
console.log(`2) Run npm run sign-log -- ${slug}`);
import 'dotenv/config';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const rawInput = process.argv[2];
const signingKeyArg = process.argv[3] || process.env.GPG_SIGNING_KEY;
if (!rawInput) {
  console.error('Usage: npm run sign-log -- <slug-or-file> [key-id-or-fingerprint]');
  console.error('Tip: set GPG_SIGNING_KEY in .env to avoid passing a key each time.');
  process.exit(1);
}

const slug = rawInput.endsWith('.md') ? rawInput.slice(0, -3) : rawInput;
const sourcePath = resolve('src', 'content', 'logs', `${slug}.md`);
const signedDir = resolve('public', 'signed-logs');
const signedPath = resolve(signedDir, `${slug}.md`);
const sigPath = resolve(signedDir, `${slug}.md.asc`);
const signedPathFromCwd = relative(process.cwd(), signedPath);
const sigPathFromCwd = relative(process.cwd(), sigPath);

if (!existsSync(sourcePath)) {
  console.error(`Log entry not found: ${sourcePath}`);
  process.exit(1);
}

if (!existsSync(signedDir)) {
  mkdirSync(signedDir, { recursive: true });
}

// Detached signatures are byte-exact; force LF to keep signatures valid across platforms.
const sourceContent = readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
writeFileSync(signedPath, sourceContent, 'utf8');

const gpgArgs = ['--yes', '--armor'];
if (signingKeyArg) {
  gpgArgs.push('--local-user', signingKeyArg);
}
gpgArgs.push('--output', sigPath, '--detach-sign', signedPath);

const result = spawnSync('gpg', gpgArgs, {
  stdio: 'inherit',
});

if (result.status !== 0) {
  console.error('gpg signing failed. Ensure gpg is installed and your signing key is available.');
  process.exit(result.status || 1);
}

console.log('Signed log artifacts written:');
console.log(`- ${signedPath}`);
console.log(`- ${sigPath}`);
if (signingKeyArg) {
  console.log(`Signing key: ${signingKeyArg}`);
}
console.log('Next: update the log frontmatter signature.signedFile and signature.signatureFile if needed.');
console.log(`Verify command: gpg --verify "${sigPathFromCwd}" "${signedPathFromCwd}"`);

# Silky.Moe

Amber CRT-style personal site built with Astro + Svelte and deployed on GitHub Pages.

## Stack

- Astro 5
- Svelte 5
- GitHub Pages (GitHub Actions deploy)
- GoatCounter (visitor count)
- GPG detached signatures for `system_logs` posts

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build static site:

```bash
npm run build
```

## Environment Variables

Create `.env` from `.env.example`.

```env
GPG_SIGNING_KEY=C4E88EF0AACBBFDB
BLOG_SIGNER=silky.moe
GPG_FINGERPRINT="968F 9FE9 CA23 9F0B 3E0E 4F5D C4E8 8EF0 AACB BFDB"
```

### What these do

- `GPG_SIGNING_KEY`: default key used by `sign-log`
- `BLOG_SIGNER`: default signer label inserted by `new-log`
- `GPG_FINGERPRINT`: default fingerprint inserted by `new-log`

## Publishing Logs

Logs are Markdown posts in:

- `src/content/logs/*.md`

Signed artifacts are published in:

- `public/signed-logs/*.md`
- `public/signed-logs/*.md.asc`

### 1. Create a new post

```bash
npm run new-log -- "Your Post Title"
```

This command:

- generates a slug from the title
- creates `src/content/logs/<slug>.md`
- sets `pubDate` to today's date
- fills signature metadata (`signer`, `fingerprint`, `signedFile`, `signatureFile`)

### 2. Edit the post body

Open the generated file and write content below frontmatter.

### 3. Sign the post

```bash
npm run sign-log -- <slug>
```

Example:

```bash
npm run sign-log -- welcome-to-system-logs
```

This command:

- copies `src/content/logs/<slug>.md` to `public/signed-logs/<slug>.md`
- generates detached signature `public/signed-logs/<slug>.md.asc`

You can override key per command if needed:

```bash
npm run sign-log -- <slug> <KEY_ID_OR_FINGERPRINT>
```

### 4. Verify locally (optional but recommended)

```bash
gpg --verify "public/signed-logs/<slug>.md.asc" "public/signed-logs/<slug>.md"
```

## Signature Verification in Site Build

During Astro build, each log signature is verified using only the public key:

- `public/pgp_public.asc`

Behavior:

- valid signature => shows as `SIGNED - <signer>`
- invalid/missing signature => shows `⚠ UNSIGNED` with warning style

This is non-fatal by design (build continues even if a post fails verification).

## Deployment

Push to `main` to trigger deploy workflow:

- `.github/workflows/deploy.yml`

GitHub Pages serves the built output from the Actions artifact.

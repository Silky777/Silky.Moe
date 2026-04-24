# Silky.Moe

Amber CRT-style personal site built with Astro and deployed on GitHub Pages.

## Stack

- Astro 5
- GitHub Pages (GitHub Actions deploy)
- GoatCounter (visitor count)
- AniList public GraphQL feed (homepage widget)
- Steam activity via Cloudflare Worker proxy (homepage widget)
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
PUBLIC_STEAM_ID=
PUBLIC_STEAM_PROXY_URL=
PUBLIC_STEAM_BLOCK_APPIDS=
PUBLIC_STEAM_BLOCK_WORDS=
```

### What these do

- `GPG_SIGNING_KEY`: default key used by `sign-log`
- `BLOG_SIGNER`: default signer label inserted by `new-log`
- `GPG_FINGERPRINT`: default fingerprint inserted by `new-log`
- `PUBLIC_STEAM_ID`: SteamID64 for your profile link / API query
- `PUBLIC_STEAM_PROXY_URL`: URL to your own Steam proxy endpoint (query param `steamId` is appended)
- `PUBLIC_STEAM_BLOCK_APPIDS`: optional comma-separated appids to hide
- `PUBLIC_STEAM_BLOCK_WORDS`: optional comma-separated case-insensitive name filters

### Steam Feed Proxy Contract

The homepage Steam widget calls:

```txt
GET {PUBLIC_STEAM_PROXY_URL}?steamId={PUBLIC_STEAM_ID}
```

Current JSON shape (used by the widget):

```json
{
  "steamId": "7656119...",
  "playerState": 1,
  "currentlyPlaying": { "appid": 730, "name": "Counter-Strike 2" },
  "player": {
    "name": "Silky",
    "profileUrl": "https://steamcommunity.com/id/...",
    "state": { "code": 1, "text": "online" }
  },
  "recentGames": [
    {
      "appid": 730,
      "name": "Counter-Strike 2",
      "lastPlayedUnix": 1714000000,
      "playtime_2weeks": 420,
      "playtime_forever": 12000
    }
  ],
  "metrics": {
    "gamesPlayed": 4,
    "totalTwoWeekMinutes": 300,
    "totalTwoWeekHours": 5,
    "topGame": { "appid": 730, "name": "Counter-Strike 2", "minutes": 210, "sharePct": 70 }
  }
}
```

Use a proxy so your Steam API key stays private and is never exposed client-side.

### Cloudflare Worker Setup

A full Worker implementation lives in [workers/steam-integration.js](workers/steam-integration.js).

Deploy flow:

1. Create a Worker named `steamintegration`
2. Paste in [workers/steam-integration.js](workers/steam-integration.js)
3. Add secret `STEAM_API_KEY`
4. Deploy
5. Verify endpoint:

```txt
https://steamintegration.<yourusername>.workers.dev?steamId=76561198347087564
```

The widget uses these fields directly:

- identity: `player.name`, `player.profileUrl`
- live state: `playerState`, `currentlyPlaying`
- ordering/display: `recentGames[].lastPlayedUnix`
- summary line: `metrics.totalTwoWeekHours`, `metrics.gamesPlayed`, `metrics.topGame`

### Production Filter Behavior

The deploy workflow currently hardcodes these build-time Steam filters:

- `PUBLIC_STEAM_BLOCK_APPIDS=250820` (SteamVR)
- `PUBLIC_STEAM_BLOCK_WORDS=hentai,nsfw,adult,sex,erotic,lewd`

They are set in [\.github/workflows/deploy.yml](.github/workflows/deploy.yml), so production does not depend on a `.env` file.

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

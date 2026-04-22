---
title: Welcome To System Logs
pubDate: 2026-04-22T13:14:58Z
tags:
  - update
  - infrastructure
signature:
  signer: silky.moe
  fingerprint: "968F 9FE9 CA23 9F0B 3E0E 4F5D C4E8 8EF0 AACB BFDB"
  signedFile: /signed-logs/welcome-to-system-logs.md
  signatureFile: /signed-logs/welcome-to-system-logs.md.asc
---
System logs are now backed by Markdown content entries.

Each publication can include detached PGP signature metadata in frontmatter.

Verification can be done offline with the signed source file, detached signature, and public key.

## Publishing Flow

1. Create a new file in src/content/logs with frontmatter.
2. Add matching signed files in public/signed-logs.
3. Push to main and let GitHub Pages build.
4. The post appears automatically in /logs.

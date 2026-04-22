import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import type { CollectionEntry } from 'astro:content';

export type SignatureStatus = {
  label: 'signed' | 'unsigned';
  warning: string | null;
  signedAt: Date | null;
};

const cache = new Map<string, SignatureStatus>();

function resolvePublicPath(absolutePathFromPublic: string): string | null {
  const publicRoot = resolve(process.cwd(), 'public');
  const relative = absolutePathFromPublic.replace(/^\/+/, '');
  const fullPath = resolve(publicRoot, relative);

  if (!fullPath.startsWith(publicRoot)) {
    return null;
  }

  return fullPath;
}

function getSignatureCreatedAt(sigPath: string): Date | null {
  const packetResult = spawnSync('gpg', ['--batch', '--no-tty', '--list-packets', sigPath], {
    encoding: 'utf8',
  });

  if (packetResult.error || packetResult.status !== 0) {
    return null;
  }

  const packetText = `${packetResult.stdout}\n${packetResult.stderr}`;
  const match = packetText.match(/created\s+(\d{9,})/);
  if (!match) {
    return null;
  }

  const created = Number(match[1]);
  if (!Number.isFinite(created)) {
    return null;
  }

  return new Date(created * 1000);
}

function verifyWithGpg(publicKeyPath: string, sigPath: string, signedPath: string): SignatureStatus {
  const gpgHome = mkdtempSync(resolve(tmpdir(), 'silky-gpg-'));
  const signedAt = getSignatureCreatedAt(sigPath);

  try {
    const importResult = spawnSync(
      'gpg',
      ['--homedir', gpgHome, '--batch', '--no-tty', '--import', publicKeyPath],
      { encoding: 'utf8' }
    );

    if (importResult.error) {
      return { label: 'unsigned', warning: 'gpg unavailable in build environment', signedAt };
    }

    if (importResult.status !== 0) {
      return { label: 'unsigned', warning: 'could not import public verification key', signedAt };
    }

    const verifyResult = spawnSync(
      'gpg',
      ['--homedir', gpgHome, '--batch', '--no-tty', '--verify', sigPath, signedPath],
      { encoding: 'utf8' }
    );

    if (verifyResult.error) {
      return { label: 'unsigned', warning: 'gpg verification command failed', signedAt };
    }

    if (verifyResult.status !== 0) {
      return { label: 'unsigned', warning: 'signature check failed', signedAt };
    }

    return { label: 'signed', warning: null, signedAt };
  } finally {
    rmSync(gpgHome, { recursive: true, force: true });
  }
}

export function getSignatureStatus(entry: CollectionEntry<'logs'>): SignatureStatus {
  if (cache.has(entry.slug)) {
    return cache.get(entry.slug)!;
  }

  const signature = entry.data.signature;
  if (!signature) {
    const status = { label: 'unsigned', warning: null, signedAt: null } as const;
    cache.set(entry.slug, status);
    return status;
  }

  const publicKeyPath = resolve(process.cwd(), 'public', 'pgp_public.asc');
  const signedPath = resolvePublicPath(signature.signedFile);
  const sigPath = resolvePublicPath(signature.signatureFile);

  let status: SignatureStatus;

  if (!existsSync(publicKeyPath)) {
    status = { label: 'unsigned', warning: 'public key file missing: /pgp_public.asc', signedAt: null };
  } else if (!signedPath || !sigPath) {
    status = { label: 'unsigned', warning: 'invalid signature file path in frontmatter', signedAt: null };
  } else if (!existsSync(signedPath) || !existsSync(sigPath)) {
    status = { label: 'unsigned', warning: 'signed file or detached signature file missing', signedAt: null };
  } else {
    status = verifyWithGpg(publicKeyPath, sigPath, signedPath);
  }

  cache.set(entry.slug, status);
  return status;
}

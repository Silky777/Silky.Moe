import fs from 'node:fs/promises';
import path from 'node:path';

const QUERY = `
  query ($userId: Int!, $perPage: Int!) {
    Page(perPage: $perPage) {
      activities(userId: $userId, sort: ID_DESC) {
        ... on ListActivity {
          id
          status
          progress
          createdAt
          media {
            title { romaji english }
            type
            siteUrl
          }
        }
      }
    }
  }
`;

const CACHE_KEY = 'anilist:latest';
const FAILURE_KEY = 'anilist:last-failure';
const DEFAULT_USER_ID = 6989389;
const DEFAULT_PER_PAGE = 20;

async function main() {
  try {
    const userId = parsePositiveInt(process.env.ANILIST_USER_ID, DEFAULT_USER_ID);
    const perPage = parsePositiveInt(process.env.ANILIST_PER_PAGE, DEFAULT_PER_PAGE);
    const payload = await fetchAnilistPayload(userId, perPage);

    const outputPath = process.env.ANILIST_OUTPUT_PATH?.trim();
    if (outputPath) {
      const resolvedPath = path.resolve(outputPath);
      await fs.writeFile(resolvedPath, JSON.stringify(payload, null, 2), 'utf-8');
      console.log(`Wrote AniList cache payload to ${resolvedPath}`);
    }

    if (hasCloudflareConfig()) {
      await pushKvValue(CACHE_KEY, JSON.stringify(payload));
      await deleteKvValue(FAILURE_KEY);
      console.log('Uploaded AniList cache to Cloudflare KV');
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'request failed';
    console.error('Failed to fetch AniList data:', message);
    process.exit(1);
  }
}

async function fetchAnilistPayload(userId, perPage) {
  console.log('Fetching AniList data...');
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { userId, perPage },
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  const activities = json?.data?.Page?.activities;
  if (!Array.isArray(activities)) {
    throw new Error('Invalid response structure: activities not found');
  }

  const filtered = activities.filter((entry) => entry && entry.media);
  return {
    data: {
      Page: {
        activities: filtered,
      },
    },
    _meta: {
      fetchedAt: new Date().toISOString(),
      userId,
      perPage,
      source: 'github-actions',
    },
  };
}

function hasCloudflareConfig() {
  return Boolean(
    process.env.CLOUDFLARE_API_TOKEN &&
      process.env.CLOUDFLARE_ACCOUNT_ID &&
      process.env.CLOUDFLARE_KV_NAMESPACE_ID
  );
}

async function pushKvValue(key, value) {
  const res = await fetch(cloudflareKvUrl(key), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: value,
  });

  if (!res.ok) {
    throw new Error(`Cloudflare KV PUT failed (${res.status}): ${await readResponseText(res)}`);
  }
}

async function deleteKvValue(key) {
  const res = await fetch(cloudflareKvUrl(key), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
  });

  if (!res.ok && res.status !== 404) {
    throw new Error(`Cloudflare KV DELETE failed (${res.status}): ${await readResponseText(res)}`);
  }
}

function cloudflareKvUrl(key) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`;
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function readResponseText(res) {
  try {
    return await res.text();
  } catch {
    return 'no response body';
  }
}

await main();

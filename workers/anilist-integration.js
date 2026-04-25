const CACHE_KEY = 'anilist:latest';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return json({ error: 'method not allowed' }, 405, { allow: 'GET, HEAD, OPTIONS' });
    }

    if (!env.ANILIST_CACHE) {
      return json({ error: 'missing ANILIST_CACHE KV binding' }, 500);
    }

    const cached = await readCache(env);
    if (cached) {
      return payloadResponse(cached.payload, 200, 'hit');
    }

    return json(
      {
        error: 'anilist cache cold',
        detail: 'GitHub Actions has not seeded Cloudflare KV yet',
      },
      503,
      {
        'cache-control': 'no-store',
        'x-anilist-cache': 'miss-empty',
      }
    );
  },

  async scheduled() {},
};

async function readCache(env) {
  const raw = await env.ANILIST_CACHE.get(CACHE_KEY);
  if (!raw) return null;

  try {
    const payload = JSON.parse(raw);
    if (!payload?.data?.Page?.activities) return null;
    return { payload };
  } catch {
    return null;
  }
}

function payloadResponse(payload, status, cacheState) {
  return json(payload, status, {
    'cache-control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
    'x-anilist-cache': cacheState,
  });
}

function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, HEAD, OPTIONS',
    'access-control-allow-headers': 'content-type',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders(),
      ...extraHeaders,
    },
  });
}

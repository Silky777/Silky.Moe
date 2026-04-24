export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const steamId = url.searchParams.get('steamId');

    if (!steamId) {
      return json({ error: 'missing steamId' }, 400);
    }

    const apiKey = env.STEAM_API_KEY;
    if (!apiKey) {
      return json({ error: 'missing STEAM_API_KEY secret' }, 500);
    }

    const base = 'https://api.steampowered.com';
    const urls = {
      summary: `${base}/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
      recent: `${base}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}&count=20`,
      owned: `${base}/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_played_free_games=1`,
    };

    const [summaryRes, recentRes, ownedRes] = await Promise.allSettled([
      fetch(urls.summary),
      fetch(urls.recent),
      fetch(urls.owned),
    ]);

    const summaryJson = await safeJson(summaryRes);
    const recentJson = await safeJson(recentRes);
    const ownedJson = await safeJson(ownedRes);

    const player = summaryJson?.response?.players?.[0] ?? null;
    if (!player) {
      return json({ error: 'steam profile not found or inaccessible', steamId }, 404);
    }

    const stateCode = Number.isFinite(player.personastate) ? player.personastate : null;
    const stateText = personaStateText(stateCode);

    const currentlyPlaying =
      player.gameid && player.gameextrainfo
        ? {
            appid: Number(player.gameid),
            name: player.gameextrainfo,
          }
        : null;

    const lastPlayedByApp = new Map();
    for (const game of ownedJson?.response?.games ?? []) {
      const appid = Number(game.appid);
      const lastPlayed = Number.parseInt(String(game.rtime_last_played ?? 0), 10);
      if (Number.isFinite(appid) && Number.isFinite(lastPlayed)) {
        lastPlayedByApp.set(appid, lastPlayed);
      }
    }

    const recentGames = (recentJson?.response?.games ?? [])
      .map((g) => enrichGame(g, lastPlayedByApp.get(Number(g.appid))))
      .sort((a, b) => (b.lastPlayedUnix ?? 0) - (a.lastPlayedUnix ?? 0));
    const metrics = computeMetrics(recentGames);

    const payload = {
      steamId,
      playerState: stateCode,
      currentlyPlaying,
      recentGames,

      player: {
        steamId,
        name: player.personaname ?? null,
        profileUrl: player.profileurl ?? null,
        avatar: player.avatarmedium ?? player.avatar ?? null,
        state: {
          code: stateCode,
          text: stateText,
        },
        currentGame: currentlyPlaying,
      },

      recent: {
        totalCount: recentGames.length,
        games: recentGames,
      },
      metrics,
    };

    return json(payload, 200, {
      'cache-control': 'public, max-age=60, s-maxage=60',
    });
  },
};

function enrichGame(game, fallbackLastPlayed) {
  const appid = Number(game.appid);
  const parsedLastPlayed = Number.parseInt(String(game.rtime_last_played ?? game.last_played ?? 0), 10);
  return {
    appid,
    name: game.name,
    lastPlayedUnix: Number.isFinite(fallbackLastPlayed)
      ? fallbackLastPlayed
      : Number.isFinite(parsedLastPlayed)
      ? parsedLastPlayed
      : 0,
    playtime_2weeks: game.playtime_2weeks ?? 0,
    playtime_forever: game.playtime_forever ?? 0,
  };
}

function computeMetrics(games) {
  const gamesPlayed = games.length;
  const totalTwoWeekMinutes = games.reduce((sum, g) => sum + (g.playtime_2weeks ?? 0), 0);
  const totalTwoWeekHours = Number((totalTwoWeekMinutes / 60).toFixed(totalTwoWeekMinutes >= 120 ? 0 : 1));

  let topGame = null;
  for (const game of games) {
    const mins = game.playtime_2weeks ?? 0;
    if (!topGame || mins > topGame.minutes) {
      topGame = {
        appid: game.appid,
        name: game.name,
        minutes: mins,
        sharePct: 0,
      };
    }
  }

  if (topGame && totalTwoWeekMinutes > 0) {
    topGame.sharePct = Math.round((topGame.minutes / totalTwoWeekMinutes) * 100);
  }

  return {
    gamesPlayed,
    totalTwoWeekMinutes,
    totalTwoWeekHours,
    topGame,
  };
}

function personaStateText(code) {
  switch (code) {
    case 0:
      return 'offline';
    case 1:
      return 'online';
    case 2:
      return 'busy';
    case 3:
      return 'away';
    case 4:
      return 'snooze';
    case 5:
      return 'looking to trade';
    case 6:
      return 'looking to play';
    default:
      return 'unknown';
  }
}

async function safeJson(settled) {
  if (settled.status !== 'fulfilled') return null;
  if (!settled.value.ok) return null;
  try {
    return await settled.value.json();
  } catch {
    return null;
  }
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      ...extraHeaders,
    },
  });
}
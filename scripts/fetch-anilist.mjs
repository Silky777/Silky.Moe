import fs from 'node:fs/promises';
import path from 'node:path';

const QUERY = `
  query {
    Page(perPage: 20) {
      activities(userId: 6989389, sort: ID_DESC) {
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

async function fetchAnilist() {
  try {
    console.log('Fetching AniList data...');
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: QUERY }),
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

    const cachePath = path.resolve('public', 'anilist-cache.json');
    await fs.writeFile(cachePath, JSON.stringify(json, null, 2), 'utf-8');
    console.log(`Successfully wrote ${activities.length} activities to ${cachePath}`);
  } catch (err) {
    console.error('Failed to fetch AniList data:', err.message);
    process.exit(1);
  }
}

fetchAnilist();

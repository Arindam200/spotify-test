import spotifyApi from "./spotifyauth.js"


async function fetchSimilarArtistsAndTracks(mood, artists) {

  const recommendations = await spotifyApi.getRecommendations({
    seed_artists: artists,
    seed_genres: [mood],
    limit: 20,
  });

  const similarArtists = recommendations.body.tracks.map(track => track.artists[0]);
  const tracks = recommendations.body.tracks;

  return { similarArtists, tracks };
}

export default fetchSimilarArtistsAndTracks;
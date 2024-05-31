import express from 'express';
import bodyParser from 'body-parser';
import fetchSimilarArtistsAndTracks from './playlistGenerator.js';
import generateAlbumArt from './albumArtGenerator.js';
import arcjet,{ detectBot, shield, fixedWindow } from '@arcjet/node';
import dotenv from 'dotenv';
dotenv.config();

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE", 
    }),
    fixedWindow({
      mode: "LIVE", 
      window: "1m",
      max: 1,
    }),
    detectBot({
      mode: "LIVE",
      block: [        
        "LIKELY_AUTOMATED",
      ],
      patterns: {
        remove: [
          "PostmanRuntime/7.39.0",
          "^curl",
        ],
      },
    }),
  ],
});

const app = express();
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    } else {
      next();
    }
  } catch (error) {
    console.error("Arcjet protection error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/generate-playlist', async (req, res) => {
  const { mood, artists } = req.body;

  try {
    const { similarArtists, tracks } = await fetchSimilarArtistsAndTracks(mood, artists);
    const albumArt = await generateAlbumArt(similarArtists);

    res.send({ playlist: tracks, albumArt });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate playlist' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Playlist Generator API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
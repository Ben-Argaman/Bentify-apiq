import * as yt from "youtube-search-without-api-key";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";

const app = express();
app.use(cors());

app.get("/api/:title", cors(), async (req, res) => {
  const videos = await yt.search(`${req.params.title} audio`);

  res.json([videos[0].id.videoId]);
});

app.listen(3000);

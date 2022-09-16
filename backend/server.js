import express from "express";
import * as yt from "youtube-search-without-api-key";

const app = express();
app.listen(
  process.env.PORT || 5002,
  console.log("server running on port 5002")
);

app.get("/api/:title", async (req, res) => {
  const videos = await yt.search(req.params.title);
  res.json(videos[0].id.videoId);
});
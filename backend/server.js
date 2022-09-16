import * as yt from "youtube-search-without-api-key";
import path from "path";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";

const app = express();
app.use(cors());

app.get("/api/:title", async (req, res) => {
  const videos = await yt.search(req.params.title);
  res.json(videos[0].id.videoId);
});
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
app.listen(
  process.env.PORT || 5002,
  console.log("server running on port 5002")
);

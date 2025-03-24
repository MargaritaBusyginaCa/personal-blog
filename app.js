import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));

app.get("/(home)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/home/:articleId", (req, res) => {
  //   res.send(req.params);
  res.sendFile(path.join(__dirname, "views", "article.html"));
});

//serve static files
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonPath = path.join(__dirname, "data", "articles.json");
const articles = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.get("/(home)?", (req, res) => {
  res.render("index", articles);
});

app.get("/article/:slug", (req, res) => {
  // const articleId = parseInt(req.params.articleId);
  const slug = req.params.slug;
  const article = findRequestedArticle(slug);
  if (article) {
    res.render("article", {
      slug: slug,
      article: article,
    });
  } else {
    res.render("404");
  }
});

app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function findRequestedArticle(slug) {
  for (let i = 0; i < articles.articles.length; i++) {
    if (slug === articles.articles[i].slug) {
      return articles.articles[i];
    }
  }
}

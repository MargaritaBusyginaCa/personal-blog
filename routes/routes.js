import express from "express";
import authentication from "../middleware/authentication.js";
import path from "path";
import fs from "fs";

const router = express.Router();
const jsonPath = path.resolve("data", "articles.json");
const articles = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

router.get("/(home)?", (req, res) => {
  res.render("index", articles);
});

router.get("/article/:slug", (req, res) => {
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

router.get("/admin", authentication, (req, res) => {
  res.render("admin-dashboard", articles);
});

router.get("*", function (req, res) {
  res.status(404).render("404");
});

function findRequestedArticle(slug) {
  for (let i = 0; i < articles.articles.length; i++) {
    if (slug === articles.articles[i].slug) {
      return articles.articles[i];
    }
  }
}

export default router;

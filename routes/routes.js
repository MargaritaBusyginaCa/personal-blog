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

router.get("/article/:id", (req, res) => {
  const id = req.params.id;
  const article = findRequestedArticle(id);
  if (article) {
    res.render("article", {
      id: id,
      article: article,
    });
  } else {
    res.render("404");
  }
});

router.get("/admin", authentication, (req, res) => {
  res.render("admin-dashboard", articles);
});

router.get("/admin/edit/:id", authentication, (req, res) => {
  const id = req.params.id;
  const article = findRequestedArticle(id);
  res.render("edit-article", article);
});

router.post("/admin/save", authentication, (req, res) => {
  const { title, id, body } = req.body;

  const index = articles.articles.findIndex((el) => el.id == id);

  //if the article wasn't found:
  if (index === -1) {
    res.status("404").render("404");
  }

  articles.articles[index].title = title;
  articles.articles[index].body = body;

  fs.writeFileSync(jsonPath, JSON.stringify(articles));

  res.redirect(`/article/${articles.articles[index].id}`);
});

router.delete("/admin/delete/:id", authentication, (req, res) => {
  const { id } = req.body;

  const index = articles.articles.findIndex((el) => el.id == id);
  articles.articles.splice(index, 1);
  fs.writeFileSync(jsonPath, JSON.stringify(articles));
  res.redirect(`/admin`);
});

router.get("/admin/create", authentication, (req, res) => {
  res.render("create-article");
});

router.post("/admin/create", authentication, (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.redirect("/admin/create?error=Missing+title+or+body");
  }

  const newArticle = {
    id: makeId(),
    title: title,
    body: body,
    date: new Date().toDateString(),
  };
  articles.articles.push(newArticle);
  fs.writeFileSync(jsonPath, JSON.stringify(articles));
  res.redirect(`/admin`);
});

function findRequestedArticle(id) {
  for (let i = 0; i < articles.articles.length; i++) {
    if (id == articles.articles[i].id) {
      return articles.articles[i];
    }
  }
}

function makeId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 5) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

router.get("*", function (req, res) {
  res.status(404).render("404");
});

export default router;

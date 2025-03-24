const response = await fetch("/articles.json");
const articles = await response.json();

function displayArticles() {
  for (let article of articles.articles) {
    const articleList = document.getElementById("article-list");
    const listEl = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", `/home/${article.id}`);
    link.innerHTML = `
      ${article.title} - ${article.publishDate}
  `;
    listEl.appendChild(link);
    articleList.appendChild(listEl);
  }
}

displayArticles();

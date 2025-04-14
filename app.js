import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import "dotenv/config";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

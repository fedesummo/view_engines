const express = require("express");
const Container = require("./src/classes/classContainer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.set("view engine", "pug");
app.set("views", "./src/views");

const myFile = new Container("./public/data.json");

app.get("/", (req, res) => res.render("main"));

app.get("/products", (req, res) => {
  myFile.getAll().then((data) => res.render("products", { data }));
});

app.post("/products", (req, res) => {
  myFile.save(req.body).then(() => res.redirect("/products"));
});

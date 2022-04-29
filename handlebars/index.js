const express = require("express");
const { engine } = require("express-handlebars");
const Container = require("./src/classes/classContainer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.set("view engine", "hbs");
app.set("views", "./src/views");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: "./src/views/layouts",
    defaultLayout: "index",
    partialsDir: "./src/views/partials",
  })
);

const myFile = new Container("./public/data.json");

app.get("/", (req, res) => res.render("main"));

app.get("/products", (req, res) => {
  myFile.getAll().then((data) => res.render("products", { data }));
});

app.post("/products", (req, res) => {
  myFile.save(req.body).then(() => res.redirect("/products"));
});

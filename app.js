const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // setup ejs
app.use(expressLayouts); // setup express-layouts
app.use(express.static("public")); // allow file static
app.use(express.urlencoded({ extended: true })); // parse data URL

// halaman home
app.get("/", (req, res) => {
  const mahasiswa = [];
  res.render("index", {
    title: "Home",
    nama: "Kunto",
    layout: "layouts/main",
    mahasiswa,
  });
});

// halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/main",
  });
});

app.listen(port, () => {
  console.log(`Contact-App | Listening at http://localhost:${port}`);
});

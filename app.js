const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
require("./utils/database");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // setup ejs
app.use(expressLayouts); // setup express-layouts

// config flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: "true",
    saveUninitialized: true,
  })
);
app.use(flash());

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

// halaman contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Contact",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman detail contact
app.get("/contact/:name", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.name });

  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Contact-App | Listening at http://localhost:${port}`);
});

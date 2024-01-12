const express = require("express");
const adminRoutes = require("./app/routes/adminRoutes");
const homeRoutes = require("./app/routes/homeRoutes");
const classRoutes = require("./app/routes/classRoutes");
const aboutRoutes = require("./app/routes/aboutRoutes");
const contactRoutes = require("./app/routes/contactRoutes");
const blogRoutes = require("./app/routes//blogRoutes");

const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");

const sessoinSecret = "hellomynameisamit";
const app = express();

app.use("/uploads", express.static("uploads"));

// app.use(express.static('public'));

app.use(
  session({
    secret: sessoinSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("dist"));

app.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure express session
app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

// Set Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend_admin"));

// Use Middle ware
app.use(cors());
app.use(
  "/build",
  express.static(path.join(__dirname, "../frontend_admin/build"))
);
app.use(
  "/dist",
  express.static(path.join(__dirname, "../frontend_admin/dist"))
);
app.use(
  "/docs",
  express.static(path.join(__dirname, "../frontend_admin/docs"))
);
app.use(
  "/pages",
  express.static(path.join(__dirname, "../frontend_admin/pages"))
);
app.use(
  "/plugins",
  express.static(path.join(__dirname, "../frontend_admin/plugins"))
);
app.use(express.static("public"));

// Middle ware for Routing
<<<<<<< HEAD
app.use("/", adminRoutes);
app.use("/home", homeRoutes);
app.use("/class", classRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/blog", blogRoutes);
=======
app.use("/", adminRoutes)
app.use("/home", homeRoutes)
app.use("/class", classRoutes)
app.use("/about", aboutRoutes)
app.use("/contact", contactRoutes)
app.use("/blog", blogRoutes)


>>>>>>> origin/main

module.exports = app;

// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session')


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const productRoutes = require("./routes/product-router");
const favouritesRoutes = require("./routes/favourites-router");
const searchRoutes = require("./routes/search-router");
const addProductRoutes = require("./routes/addProduct-router");
const adminRoutes = require("./routes/admin-router");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/products", productRoutes(db));
app.use("/favourites", favouritesRoutes(db));
app.use("/", searchRoutes(db));
app.use("/", addProductRoutes(db));
app.use("/admin", adminRoutes(db));


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", (req, res) => {

  db.query(`SELECT * FROM products;`)
  .then(data => {
    const currentUser = req.session.user_id
    const templateVars = { products: data.rows, currentUser: currentUser }
    return templateVars;
  })
  .then(data => {
    // data.currentUser["admin"] = true;
    console.log("data: ", data);
    res.render("index", data);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

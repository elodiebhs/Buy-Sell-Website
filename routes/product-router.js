/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  //Product ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id)
    db.query(`SELECT * FROM products WHERE id = $1`, [id])
    .then(data => {
      const currentUser = req.session.user_id;
      const templateVars = { products: data.rows[0], currentUser: currentUser}
      res.render("product_id", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Favourites List
  router.get("/favourites", (req, res) => {
    db.query(`SELECT * FROM favourites;`)
    .then(data => {
      const currentUser = req.session.user_id;

      if (currentUser === null) {
        res.redirect("api/users/login")
      } else {
        let userFavourites = {};
        for (let key in data.rows) {
          console.log(data.rows);
          if (data.rows[key].userID === id) {
            userURLS[key] = urlDatabase[key]; // adding new urls to urldatabase
          }
        }
        return userURLS;
      };
      }

      const templateVars = { products: data.rows[0], currentUser: currentUser}
      console.log("product id:", templateVars.products)
      res.render("favourites", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};

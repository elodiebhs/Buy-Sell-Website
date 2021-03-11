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


  // Product ID

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log("id: ", id);
    db.query(`SELECT * FROM users where users.is_admin = true; SELECT * FROM products WHERE id = ${id};`)
    .then(data => {
      console.log("data.rows: ", data.rows)
      const currentUser = req.session.user_id;
      const adminData = data.rows[0];
      const theProducts = data.rows[1];
      const templateVars = { products: theProducts, currentUser: currentUser, message: "", admin: adminData };
      res.render("product_id", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/contact", (req, res) => {
    // console.log("req.body", req.body)
    db.query(`SELECT * FROM users;`)
    .then(data => {
      // console.log("data.rows", data.rows)
      res.redirect("/");
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};

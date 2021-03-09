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
  // router.get("/:id", (req, res) => {
  //   const id = req.params.id;
  //   console.log(id)
  //   db.query(`SELECT * FROM products WHERE id = $1`, [id])
  //   .then(data => {
  //     const currentUser = req.session.user_id;
  //     const templateVars = { products: data.rows[0], currentUser: currentUser}
  //     res.render("product_id", templateVars);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  // });

  return router;
};

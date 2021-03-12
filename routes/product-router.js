const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Product page
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

  // Send message to seller on product page
  router.post("/contact", (req, res) => {
    db.query(`SELECT * FROM users;`)
    .then(data => {
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

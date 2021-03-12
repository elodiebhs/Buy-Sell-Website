const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // User Favourites List
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser === undefined) {
      res.redirect("/api/users/login");
    }
    db.query(`SELECT * FROM favourites;`)
    .then(data => {
      const currentUser = req.session.user_id;
      // Adding user favourites to new object
      let userFavourites = {};
      for (let key in data.rows) {
        if (data.rows[key].id === currentUser.id) {
          userFavourites[key] = data.rows[key];
        }
      }
      return userFavourites;
    })
    db.query(`SELECT * FROM users WHERE users.is_admin = true; SELECT * FROM products JOIN favourites ON product_id = products.id WHERE favourites.user_id = ${req.session.user_id.id};`)
    .then(data => {
      const userFavourites = data.rows.slice(1);
      const adminData = data.rows[0];
      const currentUser = req.session.user_id;
      const templateVars = { products: userFavourites, currentUser: currentUser, admin: adminData }
      res.render("favourites", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Add item to favourites list on product page
  router.post("/new", (req, res) => {
    const currentUser = req.session.user_id;
    const currentProduct = req.body.prodID;
    db.query(`INSERT INTO favourites (user_id, product_id)
    VALUES (${currentUser.id}, ${currentProduct})
    RETURNING *;`)
    .then(data => {
      res.redirect("/favourites")
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  // Deleting item from favourites list on favourites page
  router.post("/delete", (req, res) => {
    const queryString = `DELETE FROM favourites WHERE product_id = $1;`
    db.query(queryString, [req.body.product_id])
    .then(data => {
      res.redirect("/favourites");
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};

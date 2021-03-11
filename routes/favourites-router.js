const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // User Favourites List
  router.get("/", (req, res) => {
    // redirect to user to login if not logged in
    const currentUser = req.session.user_id;
    if (currentUser === undefined) {
      res.redirect("/api/users/login");
    }
    // database query if logged in
    db.query(`SELECT * FROM favourites;`)
    .then(data => {
      const currentUser = req.session.user_id;
      let userFavourites = {};

      for (let key in data.rows) {
        console.log("data.rows: ", data.rows[key].id);
        if (data.rows[key].id === currentUser.id) {
          userFavourites[key] = data.rows[key]; // adding user favourites to object list
          console.log("userFavourites loop: ", userFavourites)
        }
      }
      return userFavourites;
    })
    db.query(`SELECT * FROM users WHERE users.is_admin = true; SELECT * FROM products JOIN favourites ON product_id = products.id WHERE favourites.user_id = ${req.session.user_id.id};`)
    .then(data => {
      const userFavourites = data.rows.slice(1);
      const adminData = data.rows[0];
      console.log("favourites data.rows: ", userFavourites)
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

  router.post("/new", (req, res) => {
    const currentUser = req.session.user_id;
    const currentProduct = req.body.prodID;
    // console.log("currentUser.id", currentUser.id)
    // console.log("req.body.prodID: ", currentProduct);
    db.query(`INSERT INTO favourites (user_id, product_id)
    VALUES (${currentUser.id}, ${currentProduct})
    RETURNING *;`)
    .then(data => {
      // console.log("data.rows", data.rows)
      res.redirect("/favourites")
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });


  router.post("/delete", (req, res) => {
    const queryString = `DELETE FROM favourites WHERE product_id = $1;`
    console.log("req.body.product_id: ", req.body.product_id);


    db.query(queryString, [req.body.product_id])
    .then(data => {
      console.log("hello!!!")
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

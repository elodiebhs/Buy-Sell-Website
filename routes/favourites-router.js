const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Favourites List
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM favourites;`)
    // .then(data => {
    //   const currentUser = req.session.user_id;
    //   if (currentUser === null) {
    //     res.redirect("api/users/login")
    //   } else {
    //     let userFavourites = {};
    //     for (let key in data.rows) {
    //       if (data.rows[key].user_id === currentUser.id) {
    //         userFavourites[key] = data.rows[key]; // adding new urls to urldatabase
    //       }}
    //   //   return userFavourites;
    //   };
    // }
      .then (data => {
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

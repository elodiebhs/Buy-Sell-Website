const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Favourites List
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM favourites;`)
    .then(data => {
      const currentUser = req.session.user_id;
      console.log("currentUser: ", currentUser)
      // if (currentUser === null) {
      //   return res.redirect("api/users/login")
      // } else {
      let userFavourites = {};
      console.log("first datarows: ", data.rows)
      console.log("data.rows.id: ", data.rows.id)
      console.log("currentUser.id: ", currentUser.id)

      for (let key in data.rows) {
        console.log("data.rows: ", data.rows[key].id);
        if (data.rows[key].id === currentUser.id) {
          userFavourites[key] = data.rows[key]; // adding user favourites to object list
          console.log("userFavourites loop: ", userFavourites)
        }
      }
      return userFavourites;
      // return userFavourites;
      // console.log("userFavourites: ", userFavourites)
      // return userFavourites;
      // };
    })
    db.query(`SELECT * FROM products JOIN favourites ON product_id = products.id WHERE favourites.user_id = ${req.session.user_id.id};`)
    .then(data => {
      console.log("userFavourites: ", data.rows)
      const userFavourites = data.rows;
      const currentUser = req.session.user_id;
      console.log("currentUser: ", currentUser)
      console.log("last favorites: ", userFavourites)
      console.log("last favorites2: ", userFavourites.thumbnail_photo)


      const templateVars = { products: data.rows, currentUser: currentUser }
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

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Add a new product page (admin access only)
  router.get("/addproduct", (req, res) => {
  db.query(`SELECT * FROM users WHERE is_admin = true; SELECT * FROM products;`)
    .then(data => {
      const currentUser = req.session.user_id;
      const adminData = data.rows[0];
      const theProducts = data.rows.slice(1);
      const templateVars = { products: theProducts, currentUser: currentUser, admin: adminData }
      if (!templateVars.currentUser) {
        res.json({result:"Unauthorized Access"})
      }
      res.render("product_add", templateVars)
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  // Add product form submission
  router.post("/addproduct",(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const thumbnail_photo = req.body.thumbnail_photo;
    const main_photo = req.body.thumbnail_photo;
    const brand = req.body.brand;
    const size = req.body.size;
    const price = req.body.price;
    const feature = req.body.feature;

    const queryParams = [title, description, thumbnail_photo, main_photo, brand, size, price, feature];
    const queryString = `INSERT INTO products (title, description, thumbnail_photo, main_photo, brand, size, price, feature)
    VALUES ($1, $2, $3, $4 ,$5, $6, $7, $8) RETURNING *;`

    db.query(queryString, queryParams)
    .then(data => {
      const currentUser = req.session.user_id
      const theProducts = data.rows[0];
      const templateVars = { products: theProducts, currentUser: currentUser, admin: undefined, message: "Your product has been added" }
      res.render("product_id", templateVars);
    })
    .catch(err => {
      res.status(500)
      res.json({error: err.message});
    });
  })

  return router;
};

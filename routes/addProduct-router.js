const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/addproduct", (req, res) => {
    res.render("product_add")
  });

  router.post("/addproduct",(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const thumbnail_photo = req.body.thumbnail_photo;
    const main_photo = req.body.thumbnail_photo;
    const brand = req.body.brand;
    const size = req.session.size;
    const price = req.session.price;
    const feature = req.body.feature;
    const sold = req.body.sold;

    console.log("req.body", req.body)

    const queryString = `INSERT INTO products(title, description, thumbnail_photo, main_photo, brand, size, price)
    VALUES ($1, $2, $3, $4 ,$5, $6, $7) RETURNING *;`

    db.query(queryString, [title, description, thumbnail_photo, main_photo, brand, size, price])
      .then(data => {
        res.redirect("/")
      })
      .catch(err => {
        res.status(500)
        res.json({error: err.message});
      });
  })

return router;
};

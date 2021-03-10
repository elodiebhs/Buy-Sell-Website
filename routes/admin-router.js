const express = require('express');
const router  = express.Router();


module.exports = (db) => {
//user admin see all products
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then(data => {
        const theProducts = data.rows;
        const templateVars = { products: theProducts};
        console.log("products", templateVars)
        res.render("admin", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
      

    router.post("/delete", (req, res) => {
      console.log("req.body", req.body)
      db.query(`DELETE FROM products WHERE////////;`)
      .then(data => {
        console.log("data.rows", data.rows)
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
  
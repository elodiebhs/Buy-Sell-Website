const express = require('express');
const router  = express.Router();


module.exports = (db) => {
//user admin see all products
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then(data => {
        const currentUser = req.session.user_id;
        const theProducts = data.rows;
        const templateVars = { products: theProducts, currentUser: currentUser};
        // console.log("products", templateVars)
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
      const currentUser = req.session.user_id;
      
      const queryString = `DELETE FROM products WHERE products.id = $1;`
      db.query(queryString, [req.body.product_id])

      .then(data => {
        const theProducts = data.rows;
        // const templateVars = {products: theProducts, currentUser: currentUser, message: "Your product has been deleted"}
        console.log("data.rows", data.rows)
        res.redirect("/admin");
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });

    router.post("/sold", (req, res) => {
      console.log("req.body", req.body)
      const currentUser = req.session.user_id;
      
      const queryString = `UPDATE products SET sold = true WHERE products.id = $1;`
      db.query(queryString, [req.body.product_id])

      .then(data => {
        console.log("data.rows", data.rows)
        res.redirect("/admin");
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });
  
    return router;
  };
  
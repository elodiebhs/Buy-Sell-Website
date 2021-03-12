const express = require('express');
const router  = express.Router();


module.exports = (db) => {

    // Admin page to edit or delete current listings
    router.get("/", (req, res) => {
      db.query(`SELECT * FROM users WHERE is_admin = true; SELECT * FROM products;`)
      .then(data => {
        const currentUser = req.session.user_id;
        const adminData = data.rows[0];
        const theProducts = data.rows.slice(1);
        const templateVars = { products: theProducts, currentUser: currentUser, admin: adminData };
        console.log("currentuser: ", templateVars.currentUser)
        if (!templateVars.currentUser) {
          res.json({result:"Unauthorized Access"})
          }
        res.render("admin", templateVars);
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    // Delete listing in admin page
    router.post("/delete", (req, res) => {
      const queryString = `DELETE FROM products WHERE products.id = $1;`
      db.query(queryString, [req.body.product_id])
      .then(data => {
        res.redirect("/admin");
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });

    // Mark items as sold in admin page
    router.post("/sold", (req, res) => {
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

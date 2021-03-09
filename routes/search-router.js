const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    console.log("Search:", req.query);
    res.render("search")
  });
  return router;
}
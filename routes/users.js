/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET ------------------------------------------------------------------------
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        const currentUser = users[req.session.user_id];
        console.log("users: ", users);
        console.log("currentUser: ", currentUser);

        res.render("login", currentUser);
        res.json({ users });
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });

  router.get("/login", (req, res) => {

    db.query(`SELECT * FROM users;`)
    .then(data => {
      const currentUser = req.session.user_id;
      const templateVars = { currentUser: currentUser }
      res.render("login", templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get('/login/:id', (req, res) => {
    const currentUser = users[req.session.user_id]
    req.session.user_id = req.params.id;
    const templateVars = { currentUser: currentUser };
    console.log("req: ", req)
    console.log("templateVars: ", templateVars)
    res.render("index", templateVars);
    res.redirect('/');
  });
  // END OF GET --------------------------------------------------------------------

  // POSTS -------------------------------------------------------------------------
  router.post('/login', (req, res) => {
    console.log(req.body);
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`)
    .then(data => {
      const user = data.rows[0];
      console.log("userstest: ", user);
      req.session.user_id = user
      console.log("reqsessionuser: ", user)
      res.redirect("/");
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });


  // LOGOUT
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};

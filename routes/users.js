/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        console.log(users);
        res.render("login", users);
        res.json({ users });
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    });


    // LOGOUT INCOMPLETE
    router.post("/", (req, res) => {
      data = req.body;
      res.send(data);
      console.log("data name: ", data.name);
      return;
    })

  // LOGIN
  // might not use this
  // const login =  function(email) {
  //   return db.getUserWithEmail(email)
  //   .then(user => {
  //       return user;
  //   });
  // }
  // exports.login = login;

  // suggested to use this method for login
  router.get('/login/:id', (req, res) => {
    const currentUser = users[req.session.user_id]
    req.session.user_id = req.params.id;
    const templateVars = { currentUser: currentUser };
    console.log("req: ", req)
    console.log("templateVars: ", templateVars)
    res.render("index", templateVars);
    res.redirect('/');
  });


  router.get("/login", (req, res) => {
    console.log(req.body);
    db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      console.log(users);
      res.render("login", users);
      res.json({ users });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post('/login', (req, res) => {
    console.log(req.body);
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`)
    .then(data => {
      const users = data.rows[0];
      console.log("userstest: ", users);
      res.render("index", users);
      res.json({ users });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });


  return router;
};

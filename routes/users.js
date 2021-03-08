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
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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

  // router.post('login', (req, res) => {
  //   let email = req.body.email;
  //   console.log("email: ", email);
  // })

  router.get("/login", (req, res) => {
    const currentUser = users[req.session.user_id];
    const templateVars = { currentUser: currentUser };
    console.log("currentUser: ", currentUser)
    console.log("templateVars: ", templateVars)
    res.render("login", templateVars);
  });


  router.post("/", (req, res) => {
    data = req.body;
    res.send(data);
    console.log("data name: ", data.name);
    return;
  })

  return router;
};

/// Users
//  * Get a single user from the database given their email.
const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
}
exports.getUserWithEmail = getUserWithEmail;

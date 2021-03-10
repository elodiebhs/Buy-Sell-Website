/// May not be using this!
//  * Get a single user from the database given their email.
const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
}

const getAllProducts = function(db, options) {
  const queryParams = [];

  let queryString = `SELECT * FROM products `;

  if (options.minPrice) {
    if(queryParams.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }

    queryParams.push(`${options.minPrice}`);
    queryString += `price >= $${queryParams.length} `;
  }

  if (options.maxPrice) {
    if(queryParams.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }

    queryParams.push(`${options.maxPrice}`);
    queryString += `price <= $${queryParams.length}`;
  }
  queryString += `;`;
  console.log("querystring:", queryString, "query params:", queryParams);
  
  return db
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => err);
}


module.exports = getAllProducts;



-- Drop and recreate Users table (Example)

---DROP TABLE IF EXISTS users CASCADE;
---CREATE TABLE users (
 --- id SERIAL PRIMARY KEY NOT NULL,
 --- name VARCHAR(255) NOT NULL
---);


DROP TABLE IF EXISTS favourites CASCADE;


CREATE TABLE favourites(
  id SERIAL PRIMARY KEY ,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
);



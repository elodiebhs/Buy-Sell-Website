-- Drop and recreate Users table (Example)

---DROP TABLE IF EXISTS users CASCADE;
---CREATE TABLE users (
 --- id SERIAL PRIMARY KEY NOT NULL,
 --- name VARCHAR(255) NOT NULL
---);


DROP TABLE IF EXISTS products CASCADE;


CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_photo VARCHAR(255) NOT NULL,
  main_photo VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  size INTEGER NOT NULL,
  price INTEGER NOT NULL,
  feature BOOLEAN NOT NULL DEFAULT false,
  sold BOOLEAN NOT NULL DEFAULT false
);



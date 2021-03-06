-- Drop and recreate Users table (Example)

---DROP TABLE IF EXISTS users CASCADE;
---CREATE TABLE users (
 --- id SERIAL PRIMARY KEY NOT NULL,
 --- name VARCHAR(255) NOT NULL
---);

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
);

--this a test

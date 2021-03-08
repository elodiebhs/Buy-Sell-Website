--add a product to the Dbase by an Admin--OK

INSERT INTO products(title, description, thumbnail_photo, main_photo, brand, 
size, price)
VALUES ($1, $2, $3, $4 ,$5, $6, $7)
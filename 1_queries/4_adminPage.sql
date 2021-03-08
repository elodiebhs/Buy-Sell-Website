---see all products
SELECT products.id, products.title, thumbnail_photo
FROM products
WHERE sold = false


--- delete a product
DELETE FROM products
WHERE products.id =;

--- edit a product

UPDATE products
SET -- details the columns we want to update
WHERE products.id = ---specify product id we want to modify
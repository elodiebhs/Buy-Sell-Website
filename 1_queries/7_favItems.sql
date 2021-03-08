--Get all Fav products for a single user

SELECT products.*, favourites.*
FROM products
JOIN favourites ON favourites.user_id = products.id
JOIN users ON users.id = favourites.user_id
WHERE products.user_id = 1
ORDER BY brand;


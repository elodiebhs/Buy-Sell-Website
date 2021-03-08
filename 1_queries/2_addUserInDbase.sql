---Add a new user to the database --OK
--- LOGIN Page 

INSERT INTO users (name, email, password) 
VALUES ($1, $2, $3)
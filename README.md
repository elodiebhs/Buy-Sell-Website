LHL Node Skeleton
=========
# Functionality of the Web Site 

This is a Buy/Sell Listing Website.
An app where you can put different types of shoes up for sale. This lets buyers find the items they are looking for quickly, and easily contact sellers.


Run Shoe App on your browser: `http://localhost:8080/

Users Can:

- users can see featured items on a main feed
- users can filter items by price,
- users can favourite items to check up on them later, and access a favourites page
- users can send email to the admin that is listing the item

Admins can:

- add/post items, which can be seen by others.
- remove/delete items from the site
- mark items as SOLD!
- send an email back to the buyer 

Others:
- If a user try to access the http://localhost:8080/admin, or http://localhost:8080/addproduct, without being logged in, an error message will appear: "Unauthorized Access". 
- If a user doesn't exist in our database and try to login, an error meassage will show : "sorry you are not a user".
- Only users from our database can login. 
- If the user is also an admin, the admin has access to "My favourites", "Admin" and "Add product". If the user is not an admin, the "Admin" and "Add product" sections won't show in the header.
- Once a user logged in, the email@ is appearing in the header.
- Once a new item is posted by the admin, an alert confirming that the product has been posted is showing up.
- By clicking on logout, the user can logout.
- we added a customize logo in the head of the page


## Images of our pages

- Login Page
!["Screenshot of Login Page"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/login.png)

!["Screenshot of Main Page"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/main_1.png)

!["Screenshot of Main Page_2"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/main_2.png)

!["Screenshot of Main Page_3"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/main_3.png)

!["Screenshot of Login as Admin"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/Admin%20access.png)

!["Screenshot of Login as not Admin"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/not%20admin.png)

!["Screenshot of Favourites"](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/my_favourites.png)

!["Screenshot of Admin "](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/Admin_page.png)

!["Screenshot of Add products "](https://github.com/elodiebhs/Buy-Sell-Website/blob/master/docs/Add_products.png)


### Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

#### Dependencies

Install all dependencies : npm install

- "body-parser": "^1.19.0",
- "chalk": "^2.4.2",
- "cookie-session": "^1.4.0",
- "dotenv": "^2.0.0",
- "ejs": "^2.7.4",
- "express": "^4.17.1",
- "morgan": "^1.9.1",
- "node-sass-middleware": "^0.11.0",
- "nodemailer": "^6.5.0",
- "pg": "^6.4.2",
- "pg-native": "^3.0.0"

Run the development web serve : npm start


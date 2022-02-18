# Codeial - MERN

## Libraries Used

### 🎯 ejs

- View Engine

### 🎯 express

### 🎯 express-ejs-layouts

### 🎯 mongoose

### 🎯 passport

- Authentication

### 🎯 passport-local

- Strategy used for User Authentication & Authorization

### 🎯 passport-jwt

- Strategy used for API Authentication & Authorization

### 🎯 jsonwebtoken

- used for generating encrypted jwt, then passport-jwt can be used to decrypt it

### 🎯 passport-google-oauth

- used for social authentication using google oauth2.0

### 🎯 crypto

- generate random passwords

### 🎯 express-sessios

- To create a session cookie
- To store the logged in user's information in an encrypted format in the cookie

### 🎯 connect-mongo

- our session cookie gets reset everytime our server starts, hence we store it in a DB - Mongo Store

### 🎯 connect-flash

- The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.

### 🎯 sass

- to simplify writing css, using scss

### 🎯 noty (cdn)

- to animate our flash messages

### 🎯 multer

- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

### 🎯 nodemailer

- used for sending emails to users

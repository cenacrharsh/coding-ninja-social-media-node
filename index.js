const express = require("express");
const app = express();
const port = 8000;

//# Environment Variables
const env = require("./config/environment");

//# Morgan
const logger = require("morgan");

//# View Helper
require("./config/view-helpers")(app);

//# Layouts
const expressLayouts = require("express-ejs-layouts");

//# Cookies
const cookieParser = require("cookie-parser");

//# Database
const db = require("./config/mongoose");

//# Express-Session for Session Cookie
const session = require("express-session");

//# Flash Message using connect-flash
const flash = require("connect-flash");

//# Custom Middleware
const customMware = require("./config/middleware");

//# Passport and Passport-Local for Authentication, and Passport-JWT for API auth, Google for Social Auth
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

//# Mongo Store
const MongoStore = require("connect-mongo");

//# Set up the Chat Server to be used with Socket.IO
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log(`Chat Server is Listening on Port: ${5000}`);

//! Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//! Make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

//! Static Files
app.use(express.static(env.asset_path));

//! Morgan
app.use(logger(env.morgan.mode, env.morgan.options));

//! Setting up Layouts
app.use(expressLayouts);

//! Extract Style and Scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//! Setting Up the View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

//! Middleware for taking in the session cookie and encrypting it
app.use(
  session({
    name: "codeial" /* name of cookie */,
    secret: env.session_cookie_key,
    /* encryption requires a key to code & decode */ saveUninitialized: false,
    /* don't save extra data in cookie if session is uninitialized */
    resave: false,
    /* don't rewrite session data if unchanged */ cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        /* mongo store is used to store the session cookie in the db */

        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//! Middleware to use Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(
  passport.setAuthenticatedUser
); /* whenever any request comes in, user will be set in locals and user will be accessible in views */

//! Middleware for setting up connect flash, and custom middleware
app.use(flash());
app.use(customMware.setFlash);

//! Use Express Router
app.use("/", require("./routes")); /* fetches index.js by default */

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }

  console.log(`Server is Running on Port : ${port}`);
});

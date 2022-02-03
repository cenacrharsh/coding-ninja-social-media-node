const express = require("express");
const app = express();
const port = 8000;

// Layouts
const expressLayouts = require("express-ejs-layouts");

// Cookies
const cookieParser = require("cookie-parser");

// Database
const db = require("./config/mongoose");

// Express-Session for Session Cookie
const session = require("express-session");

// Passport and Passport-Local for Authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// Mongo Store
const MongoStore = require("connect-mongo");

// Middleware
app.use(express.urlencoded());
app.use(cookieParser());

// Static Files
app.use(express.static("./assets"));

// Setting up Layouts
app.use(expressLayouts);
/* extract style and scripts from sub pages into the layout */
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Setting Up the View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware for taking in the session cookie and encrypting it
app.use(
  session({
    name: "codeial" /* name of cookie */,
    secret: "blahsomething" /* encryption requires a key to code & decode */,
    saveUninitialized: false /* don't save extra data in cookie if session is uninitialized */,
    resave: false /* don't rewrite session data if unchanged */,
    cookie: {
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

// Middleware to use Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(
  passport.setAuthenticatedUser
); /* whenever any request comes in, user will be set in locals and user will be accessible in views */

// Use Express Router
app.use("/", require("./routes")); /* fetches index.js by default */

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }

  console.log(
    `Server is running on port : ${port} - Printing from root index.js`
  );
});

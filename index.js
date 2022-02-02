const express = require("express");
const app = express();
const port = 8000;

// Layouts
const expressLayouts = require("express-ejs-layouts");

// Cookies
const cookieParser = require("cookie-parser");

// Database
const db = require("./config/mongoose");

// Middleware
// app.use(express.urlencoded());
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

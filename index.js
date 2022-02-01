const express = require("express");
const app = express();
const port = 8000;

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

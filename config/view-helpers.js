const fs = require("fs");
const path = require("path");

//# Environment Variables
const env = require("./environment");

module.exports = (app) => {
  app.locals.assetPath = function (filePath) {
    if (env.name == "development") {
      return filePath;
    }

    console.log(
      "/" +
        JSON.parse(
          fs.readFileSync(
            path.join(__dirname, "../public/assets/rev-manifest.json")
          )
        )[filePath]
    );

    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filePath]
    );
  };
};
const path = require("path");

module.exports = {
  mode: "development",
  entry: [
    "../CNPM_chatApp/database",
    "../CNPM_chatApp/signin",
    "../CNPM_chatApp/signup",
  ],
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
  },
  watch: true,
};

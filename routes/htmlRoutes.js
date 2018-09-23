// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function (app) {
  //
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/board");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  //

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/board", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/board.html"));
  });

  app.get("/bio", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/bio.html"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  // app.get("/members", isAuthenticated, function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
};

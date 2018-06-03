// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipe.html"));
    });

    // cms route loads cms.html
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // recipe route loads recipe.html
    app.get("/recipe", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipe.html"));
    });

    // categories route loads categories.html
    app.get("/categories", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/categories.html"));
    });

    // view shopping list
    app.get("/view", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};
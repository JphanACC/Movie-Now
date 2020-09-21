const express = require("express");
const router = express.Router();

const db = require("../models");

//Base route admin
router.get("/", (req, res) => {
    res.render("admin/index", { title: "Admin Page", css: "main" });
});

// SECTION Movie
router.get("/newMovie", (req, res) => {
    res.render("admin/newMovie", { title: "Make a New Movie", css: "main" });
});


// SECTION Theatre
router.get("/newTheatre", (req, res) => {
    res.render("admin/newTheatre", { title: "Make a New Theatre", css: "main" });
});



module.exports = router;
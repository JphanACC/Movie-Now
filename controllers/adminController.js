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

router.get("/editTheatre", (req, res) => {
    db.Theatre.find({}).populate("theatres").exec(function (err, foundTheatres) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { theatres: foundTheatres };
        res.render("admin/editTheatre", context);
    });
});


module.exports = router;
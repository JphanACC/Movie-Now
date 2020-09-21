const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/", (req, res) => {
    db.Theatre.create(req.body, (err, createdTheatre) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        console.log(createdTheatre);
        res.redirect("/theatre");
    });
});

router.get("/editTheatre", (req, res) => {
    db.Theatre.find({}.populate("theatres").exec(function (err, foundTheatres) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { theatres: foundTheatres };
        res.render("/editTheatre", context);
    }));
});

module.exports = router;
const express = require("express");
const router = express.Router();

const db = require("../models");


/* Create Movie Listing */
router.post("/", (req, res) => {
    db.Movie.create(req.body, (err, createdMovie) => {
        if (err) {
            console.log(err);
            console.log(req.body);
            return res.send(err);
        }
        console.log(req.body);
        console.log(createdMovie);
        res.redirect("/newMovie");
    });
})


module.exports = router;
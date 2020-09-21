const express = require("express");
const router = express.Router();

const db = require("../models");


/* Create Movie Listing */
router.post("/", (req, res) => {
    db.Movie.create(req.body, (err, createdMovie) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        console.log(createdMovie);
        res.redirect("/admin/");
    });
})

/* Edit Movie Listing*/
//update route



module.exports = router;
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
router.put("/:id", (req, res) => {
    db.Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMovie) => {
        if (err) {
            return console.log(err);
        }
        res.redirect(`/admin/${updatedMovie._id}`)
    })
})


module.exports = router;
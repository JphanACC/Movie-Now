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

        res.redirect(`/admin/`)
    })
})

//delete route
router.delete("/:id", (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
        if (err) return res.send(err);

        res.redirect("/admin/");
    })
})


module.exports = router;
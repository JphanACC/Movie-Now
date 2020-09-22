const express = require("express");
const router = express.Router();

const db = require("../models");

//Movie show page
router.get("/:id", (req, res) => {
    db.Movie.findById(req.params.id, (err, foundMovie) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = {
            movie: foundMovie,
            title: foundMovie.name, 
            css: "main"};
        res.render("movie/show", context);
    });
});

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
        db.Showing.remove({ Movie: deletedMovie._id }, (err, removedShowing) => {
            if (err) return res.send(err);
            res.redirect("/admin/");
        })
    })
})


module.exports = router;
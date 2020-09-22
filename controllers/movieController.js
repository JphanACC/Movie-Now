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

// router.get("/:id", async(req, res) => {
//     try {
//         const createdTheatre = await db.Theatre.create(req.body)
//         const foundMovie = await db.Movie.findById(req.body.movie);

//         foundMovie.theatres.push(createdTheatre);
//         await foundMovie.save();

//         res.redirect("/admin/")

//     } catch (error) {
//         console.log(error);
//         res.send({ message: "Test: server error" })

//     }
// })

//delete route
router.delete("/:id", (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
        if (err) return res.send(err);
        res.redirect("/admin/")
    })
})


module.exports = router;
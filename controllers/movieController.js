const express = require("express");
const router = express.Router();

const db = require("../models");

//Movie show page
// router.get("/:id", async (req, res) => {
//     const context = {};
//     try {
//         const movieId = req.params.id;
//         const theatreList = [];
//         const theatreObjects = [];
//         db.Movie.findById(movieId, async (foundMovie) => {
//             db.Showing.find({Movie: movieId, playing: true}, function(showing) {
//                 showing.forEach(showing => {
//                     console.log(showing);
//                     theatreList.push(showing.Theatre);
//                 });
//             });
//             console.log(theatreList);
//             const addContext = function(foundMovie) {
//                 context = {
//                     movie: foundMovie,
//                     title: foundMovie.name, 
//                     css: "main"
//                 };
//             };
//             await addContext(foundMovie);
//         });
//         await res.render("movie/show", context);
//     } catch (error) {
//         res.send({message: "Internal server error"});
//     }
// });

router.get("/:id", (req, res) => {
    const movieId = req.params.id;
    const theatreList = [];
    db.Movie.findById(movieId, (err, foundMovie) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        db.Showing.find({Movie: movieId, playing: true}, function(err, showing) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            showing.forEach(showing => {
                theatreList.push(showing.Theatre);
            });
            console.log(theatreList);
        });
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

        res.redirect("/admin/");
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
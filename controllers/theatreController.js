const express = require("express");
const {
    Showing
} = require("../models");
const router = express.Router();

const db = require("../models");

//create route
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

//update route
router.put("/:id", (req, res) => {
    db.Theatre.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedTheatre) => {
        if (err) {
            return console.log(err);
        }
        res.redirect(`/theatre/${updatedTheatre._id}`);
    });
});

//delete route
router.delete("/:id", (req, res) => {
    db.Theatre.findByIdAndDelete(req.params.id, (err, deletedTheatre) => {
        if (err) return res.send(err);
        db.Showing.remove({
            Theatre: deletedTheatre._id
        }, (err, removedShowing) => {
            if (err) return res.send(err);
            res.redirect("/theatre");
        })
    });
});

//show All route
router.get("/", (req, res) => {
    db.Theatre.find({}, (err, foundTheatre) => {
        if (err) return res.send(err);
        const content = {
            theatres: foundTheatre
        };
        res.render("theatre/index", {
            title: "All Theatres List",
            css: "main",
            theatres: foundTheatre
        });
    });
})

//show route (individual theatre)
// router.get("/:id", (req, res) => {
//     db.Theatre.findById(req.params.id, (err, foundTheatre) => {
//         if (err) return res.send(err);
//         db.Showing.findById({Theatre: theatre._id}, (err, foundShowing) => {
//             if (err) return res.send(err);

//             res.render("theatre/show", {
//                 title: "All Theatres List",
//                 css: "main",
//                 theatre: foundTheatre,
//                 showing: foundShowing,
//             });
//         })

//     })
// })
router.get("/:id", (req, res) => {
    let moviesList = [];
    db.Theatre.findById(req.params.id).exec(function(err, foundTheatre) {
        if (err) return res.send(err);
        console.log(`Debug 1`);

        db.Showing.find({ Theatre: foundTheatre._id, playing: true }).populate("Movie").exec((err, foundShowing) => {
            if (err) return res.send(err);

            console.log("debug Showing Time:");
            console.log(foundShowing.time);
            foundShowing.forEach(showing => {
                moviesList.push(showing.Movie);
            });

            res.render("theatre/show", {
                title: "All Theatres List",
                css: "main",
                theatre: foundTheatre,
                showing: foundShowing,
                movies: moviesList,
            });

        })
    })

})

// SECTION Partials - Show (Show all Theatre List)
//show route for EJS
// route: http://localhost:3000/theatre-partials/showAll
router.get("/showAll", (req, res) => {
    db.Theatre.find({}, (err, foundTheatre) => {
        if (err) return res.send(err);
        const content = {
            theatres: foundTheatre
        };

        res.render("partials/alltheatreList", content);
    });
});
module.exports = router;
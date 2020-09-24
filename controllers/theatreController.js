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

//show individual Theatre route
router.get("/:id", (req, res) => {
    let moviesList = [];
    db.Theatre.findById(req.params.id).exec(function(err, foundTheatre) {
        if (err) return res.send(err);
        db.Showing.find({ Theatre: foundTheatre._id, playing: true }).populate("Movie").exec((err, foundShowing) => {
            if (err) return res.send(err);
            foundShowing.forEach((showing, idx) => {
                moviesList.push(showing.Movie);
                moviesList[idx].time = showing.time;
                moviesList[idx].price = showing.price;
                moviesList[idx].showingID = showing._id;
            });
            console.log(moviesList);

            res.render("theatre/show", {
                title: foundTheatre.name,
                css: "main",
                theatre: foundTheatre,
                showing: foundShowing,
                movies: moviesList,
            });
        });
    });
});

//showings by movie route
router.get("/showings/:id", (req, res) => {
    db.Showing.find({Movie: req.params.id, playing: true}).populate("Movie Theatre").exec(function(err, foundShowings) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = {
            title: `All showings for ${foundShowings[0].Movie.name}`,
            css: "main",
            showings: foundShowings,
        };
        res.render("theatre/filteredShowings", context);
    });
});

//Ticket Confirmation Route
router.get("/ticket/:id", (req, res) => {
    db.Showing.findById(req.params.id).populate("Theatre Movie").exec(function(err, foundShowing) {
        if (err) return res.send(err);
        console.log(foundShowing)
        const { Theatre, Movie } = foundShowing;

        res.render("movie/ticket", {
            title: "Ticket Order Confirmation",
            css: "main",
            showing: foundShowing,
            theatre: Theatre,
            movie: Movie,
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
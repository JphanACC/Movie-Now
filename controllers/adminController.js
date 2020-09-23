const express = require("express");
const router = express.Router();

const db = require("../models");

//Base route admin
router.get("/", (req, res) => {
    res.render("admin/index", { title: "Admin Page", css: "main" });
});

// SECTION Movie
router.get("/newMovie", (req, res) => {
    res.render("admin/newMovie", { title: "Make a New Movie", css: "main" });
});
//Show Select Movie
router.get("/selectMovie", (req, res) => {
    db.Movie.find({}, (error, foundMovies) => {
        if (error) return res.send(error);
        const context = {
            movies: foundMovies,
        };
        res.render("admin/selectMovie", context)
    })
})

//Show Select Movie by ID
router.get("/selectMovie/:id", (req, res) => {
    db.Movie.findById(req.params.id).populate("Theatres").exec((err, foundMovie) => {
        if (err) return res.send(err);
        const context = { movie: foundMovie };
        db.Theatre.find().exec((err, foundTheatres) => {
            if (err) return res.send(err);


            res.render("admin/editMovie", { movie: foundMovie, theatres: foundTheatres })
        });
    })
});

// SECTION Theatre
router.get("/newTheatre", (req, res) => {
    res.render("admin/newTheatre", { title: "Make a New Theatre", css: "main" });
});

router.get("/selectTheatre", (req, res) => {
    db.Theatre.find({}).populate("theatres").exec(function(err, foundTheatres) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { theatres: foundTheatres };
        res.render("admin/selectTheatre", context);
    });
});

router.get("/selectTheatreToEditShowing", (req, res) => {
    db.Theatre.find({}).populate("theatres").exec(function(err, foundTheatres) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { theatres: foundTheatres };
        res.render("admin/selectTheatreToEditShowing", context);
    });
});

router.get("/editShowing/:id", (req, res) => {
    const theatreId = req.params.id;
    db.Theatre.findById(theatreId, (err, foundTheatre) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        db.Showing.find({Theatre: theatreId}).populate("Movie").exec((err, foundShowings) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            //console.log(foundTheatre);
            console.log(foundShowings.Movie);
            const context = {
                title: `Edit showings for ${foundTheatre.name}`,
                css: "main",
                showings: foundShowings,
                movie: foundShowings.Movie,
            };
            res.render("admin/editShowing", context);
        })
    })
})

router.get("/selectTheatre/:id", (req, res) => {
    db.Theatre.findById(req.params.id, (err, foundTheatre) => {
        if (err) {
            return console.log(err);
        }
        console.log(foundTheatre);
        res.render("admin/editTheatre", {
            theatre: foundTheatre
        });
    });
});

//SECTION Schedule

/* Experiment */
router.get("/newShowing", (req, res) => {
    db.Movie.find({})
        .populate("Theatres")
        .exec(function(err, foundMovies) {
            if (err) {
                return res.send(err);
            }
            db.Theatre.find().exec((err, foundTheatres) => {
                if (err) return res.send(err);
                res.render("admin/newShowing", { movie: foundMovies, theatre: foundTheatres, title: "Add new showing", css: "main" })
            });
        });
});


module.exports = router;
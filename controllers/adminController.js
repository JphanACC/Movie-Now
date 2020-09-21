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


// router.get("/editMovie", async(req, res) => {
//     try {
//         const foundMovie = await db.Movie.find({});

//         const context = {
//             movies: foundMovie
//         };
//         res.render("admin/editMovie", context)
//     } catch (error) {
//         console.log(error);
//         return res.send(error)
//     }
// })

router.get("/editMovie", (req, res) => {
    db.Movie.find({}, (error, foundMovies) => {
        if (error) return res.send(error);
        const context = {
            movies: foundMovies,
        };
        res.render("admin/editMovie", context)
    })
})


// SECTION Theatre
router.get("/newTheatre", (req, res) => {
    res.render("admin/newTheatre", { title: "Make a New Theatre", css: "main" });
});

router.get("/selectTheatre", (req, res) => {
    db.Theatre.find({}).populate("theatres").exec(function (err, foundTheatres) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { theatres: foundTheatres };
        res.render("admin/selectTheatre", context);
    });
});

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

module.exports = router;
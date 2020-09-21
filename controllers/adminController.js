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



module.exports = router;
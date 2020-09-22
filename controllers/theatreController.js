const express = require("express");
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
    db.Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTheatre) => {
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
        db.Showing.remove({ Theatre: deletedTheatre._id }, (err, removedShowing) => {
            if (err) return res.send(err);
            res.redirect("/theatre");
        })
    });
});

//show All route
router.get("/", (req, res) => {
    db.Theatre.find({}, (err, foundTheatre) => {
        if (err) return res.send(err);
        const content = { theatres: foundTheatre };
        res.render("theatre/index", { title: "All Theatres List", css: "main", theatres: foundTheatre });
    });
})


// SECTION Partials - Show (Show all Theatre List)
//show route for EJS
// route: http://localhost:3000/theatre-partials/showAll
router.get("/showAll", (req, res) => {
    db.Theatre.find({}, (err, foundTheatre) => {
        if (err) return res.send(err);
        const content = { theatres: foundTheatre };

        res.render("partials/theatreTemplate", content);
    });
});
module.exports = router;
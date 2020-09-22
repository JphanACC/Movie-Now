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

module.exports = router;
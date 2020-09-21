const express = require("express");
const router = express.Router();

const db = require("../models");

router.post("/", (req, res) => {
    db.Theatre.create(req.body, (err, createdTheatre) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        console.log(createdTheatre);
        res.redirect("/theatres");
    });
});

router.put("/:id", (req, res) => {
    db.Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTheatre) => {
        if (err) {
            return console.log(err);
        }
        res.redirect(`/theatres/${updatedTheatre._id}`);
    });
});


module.exports = router;
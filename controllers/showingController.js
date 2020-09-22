const express = require("express");
const { movie } = require(".");
const router = express.Router();

const db = require("../models");

//Create new Listing
router.post("/", (req, res) => {
    console.log(req.body);
    for (const key in req.body.playing) {

        console.log(key);

        if (req.body.playing[key][0] === 'on') {

            const newShowing = {
                time: key,
                price: req.body.price,
                Theatre: req.body.Theatre,
                Movie: req.body.playing[key][1],
                playing: true,
            }
            console.log("Debug 2:---------------- Check newShowing");
            console.log(newShowing);
            db.Showing.create(newShowing, (err, createdShowing) => {
                if (err) return res.send(err);
                console.log("Debug 3");

            })
        }
    }
    res.redirect("/admin/");

})

module.exports = router;
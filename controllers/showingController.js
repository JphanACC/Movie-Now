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
            db.Showing.create(newShowing, (err, createdShowing) => {
                if (err) return res.send(err);
                console.log("Debug 3");
            });
        }
    }
    res.redirect("/admin/");
});

router.put("/", (req,res) => {
    console.log(req.body);
    for (const key in req.body) {
        console.log(req.body[key]);
        if (req.body[key][0] === 'on') {
            const editShowing = {
                price: req.body[key][2],
                Movie: req.body[key][1],
                playing: true,
            }
            db.Showing.findByIdAndUpdate(req.body[key], editShowing, {new: true}, (err, updatedShowing) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                console.log(updatedShowing);
            })
        } else {
            const editShowing = {
                playing: false,
            }
            db.Showing.findByIdAndUpdate(req.body[key], editShowing, {new: true}, (err, updatedShowing) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                console.log(updatedShowing);
            })
        }
    }
    res.redirect("/admin");
})

module.exports = router;
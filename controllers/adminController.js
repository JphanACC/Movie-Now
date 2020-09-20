const express = require("express");
const router = express.Router();

const db = require("../models");

//Base route admin
router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/newMovie", (req, res) => {
    res.render("admin/newMovie", { title: "Make a New Movie" });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const controllers = require("../controllers")


//Create new Listing
router.post("/", controllers.showing.create);

router.put("/", controllers.showing.update);

module.exports = router;
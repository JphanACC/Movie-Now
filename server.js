/* external modules*/
const express = require("express");
const methodOverride = require("method-override");


/* internal modules*/
const db = require("./models");
const controllers = require("./controllers");

/*Instanced Modules */
const app = express();

/* Config */
const PORT = 3000;
app.set("view engine", "ejs");

/* middleware */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Routes */
// Home Page
app.get("/", (req, res) => {
    res.render("index");
});

//Admin Home
app.use("/admin", controllers.admin);



/* Server Listener*/
app.listen(PORT, function() {
    console.log(`Server is listening to on http://localhost:${PORT}`);
});
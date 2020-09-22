/* external modules*/
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");


/* internal modules*/
const db = require("./models");
const controllers = require("./controllers");

/*Instanced Modules */
const app = express();

/* Config */
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* middleware */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Routes */
// NOTE Home Page
app.get("/", (req, res) => {
    res.render("index", { title: 'Home Page Test', css: 'main' });
});
app.get("/template", (req, res) => {
    res.render("partials/alltheatreList", { title: 'Theatre List', css: 'main' });
});


//Admin Home
app.use("/admin", controllers.admin);

//Theatre Routes
app.use("/theatre", controllers.theatre);

app.use("/movie", controllers.movie);

app.use("/showing", controllers.showing);


/* Server Listener*/
app.listen(PORT, function() {
    console.log(`Server is listening to on http://localhost:${PORT}`);
});
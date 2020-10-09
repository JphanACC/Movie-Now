/* external modules*/
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");


/* internal modules*/
const db = require("./models");
const controllers = require("./controllers");
const routes = require("./routes");

const { shuffle } = require("./utils/utils.js"); // <- utils are a great way to store functionality for use across the app

/*Instanced Modules */
const app = express();

/* Config */
const PORT = process.env.DATABASE_URL || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* middleware */
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

/* Routes */
// NOTE Home Page
app.get("/", (req, res) => {
    db.Movie.find({}).exec(function(err, foundMovies) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        shuffle(foundMovies);
        res.render("index", {
            title: 'Movie Now',
            css: 'main',
            movies: foundMovies,
        });
    });
});


//Admin Home
app.use("/admin", controllers.admin);

//Theatre Routes
app.use("/theatre", controllers.theatre);

app.use("/movie", controllers.movie);

app.use("/showing", routes.showings); // <- this uses the new routes addition


/* Server Listener*/
app.listen(process.env.PORT || 3000);
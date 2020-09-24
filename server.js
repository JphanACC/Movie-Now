/* external modules*/
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
//security
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");


/* internal modules*/
const db = require("./models");
const controllers = require("./controllers");

/*Instanced Modules */
const app = express();

/* Config */
const PORT = 3000;
const corsOptions = {
    origin: [`http://localhost:${PORT}`],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//rate limit settings
const LIMIT = rateLimit({
    max: 10000,
    windowMS: 24*60*60*1000,
    message: "You've seen too many movies today. Why not go for a walk?",
});

/* middleware */
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

//security
app.use(LIMIT);
app.use(helmet());
app.use(mongoSanitize());

/* Routes */
// NOTE Home Page
app.get("/", (req, res) => {
        db.Movie.find({}).populate("movies").exec(function(err, foundMovies) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        shuffle(foundMovies);    
        res.render("index", {
            title: 'Home Page Test',
            css: 'main',
            movies: foundMovies,
        });
    })
});


app.get("/template", (req, res) => {
    res.render("partials/alltheatreList", {
        title: 'Theatre List',
        css: 'main'
    });
});


//Admin Home
app.use("/admin", controllers.admin);

//Theatre Routes
app.use("/theatre", controllers.theatre);

app.use("/movie", controllers.movie);

app.use("/showing", controllers.showing);

app.use("/theatre-partials/", controllers.theatre);


/* Server Listener*/
app.listen(PORT, function() {
    console.log(`Server is listening to on http://localhost:${PORT}`);
});

/**
 * Fisher-Yates shuffle randomizes cards array
 * @author Mike Bostock - https://bost.ocks.org/mike/shuffle/
 */
const shuffle = function(array) {
    let length = array.length;
    let element;
    let index;
    while (length) {
        index = Math.floor(Math.random() * length--);
        element = array[length];
        array[length] = array[index];
        array[index] = element;
    }
    return array;
};
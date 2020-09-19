const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "You must provide a name."] },
        director: { type: String, required: [true, "You must provide a director."] },
        genre: { type: String, required: [true, "You must provide a genre."] },
        yearReleased: { type: String, required: [true, "You must provide a release year."] },
        plotSummary: { type: String, required: [true, "You must provide a plot summary."] },
        plotSummary: { type: String, required: [true, "You must provide a plot summary."] },
        actors: { type: [String], required: [true, "You must provide at least one actor."]},
        images: { type: [String], required: [true, "You must provide at least one image."]},
        Theatres: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatre",
        },],
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
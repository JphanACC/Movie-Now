const mongoose = require("mongoose");

const showingSchema = new mongoose.Schema({
    time: { type: String },
    price: { type: Number },
    playing: { type: Boolean, required: true, default: false },
    Theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
    },
    Movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    },
}, {
    timestamps: true,
});

const Showing = mongoose.model("Showing", showingSchema);

module.exports = Showing;
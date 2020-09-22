const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: { type: String, required: [true, "You must provide a name."] },
    location: { type: String, required: [true, "You must provide a location."] },
    image: { type: String },
    Showings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Showing",
        },
    ],
    },
    {
        timestamps: true,
    }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/movieNow";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(function() {
    console.log("MongoDB connected");
}).catch(function(error) {
    console.log("MongoDB connection error", error);
});

mongoose.connection.on("disconnect", function(event) {
    console.log("MongoDB disconnected", event);
});

module.exports = {
    Movie: require("./Movie"),
    Theatre: require("./Theatre"),
    Showing: require("./Showing"),
};
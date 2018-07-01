var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
            {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144295f4c371a0eab6_340.jpg"},
            {name: "Granit Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144295f4c371a0eab6_340.jpg"},
            {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/eb32b7072df5043ed1584d05fb1d4e97e07ee3d21cac104496f0c57bafeab2bb_340.jpg"}
        ]
        
        res.render("campgrounds", {campgrounds: campgrounds});
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Servar Has Started!");
})
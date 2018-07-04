var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema =new mongoose.Schema({
    name: String,
    image: String, 
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granit Hill", 
//     image: "http://4.bp.blogspot.com/-0xecSPGE3fc/UnYi6NjL_AI/AAAAAAAAClw/hzeZky6mIrQ/s1600/DSC05653.JPG",
//     description: "This is a huge granit hill, with no bathrooms. No water , beautifull granit!"
//     }, function(err, campground) {
//         if(err) {
//             console.lo(err);
//         } else {
//             console.log("NEW Campground created");
//             console.log(campground);
//         }
//     });

var campgrounds = [
        {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmXnA0nPXU41uscxsnX1loXVu9ddWJ2NrqS8UeOMTyySFLrUk"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7m0WfJxvQvAZY09mFtZ9F1QxpLAPS3-dROt684wAABdLIGrwB"},
        {name: "Granit Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9ZYROUpiiOIDwL3PPcqGkIQCvsEE1VrZUWRz8vT0cERillht"},
        {name: "Mountain Goat's Rest", image: "http://www.editionsblabla.fr/wp-content/uploads/2018/02/location-camping-pont-du-tarn-coco-sweet-min.jpg"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTLn-GXTBdOTezWA9cwF24B_lkk7Xh2sT-2SIPmQaUSw4mgvT"},
        {name: "Granit Hill", image: "https://www.quebecoriginal.com/en/listing/images/800x600/ae2894cf-af0a-46dc-904d-8a91b0059376/camping-parc-national-du-mont-tremblant-de-la-diable-camping-secteur-la-diable.jpg"},
        {name: "Mountain Goat's Rest", image: "https://cdn.vox-cdn.com/thumbor/G06ar5iSYGeKFUNi5Ubfji7b_V4=/0x0:3968x2976/1200x800/filters:focal(1667x1171:2301x1805)/cdn.vox-cdn.com/uploads/chorus_image/image/57016269/170817_GT_TIPI_01.0.jpg"}
    ];

app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", {campgrounds: campgrounds});
    //get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log("ERROR");
        } else {
            res.render("index", {campgrounds: allcampgrounds})
        }
    });
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res) {
    //get data from form add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampgrounds = {name: name, image: image, description: description};
    //create a new campgrounds and save it to DB
    Campground.create(newCampgrounds, function(err, newlyCreated) {
        if(err) {
            console.log("ERROR");
        } else {
            //redirect to campgrounds page
           res.redirect("/campgrounds"); 
        }
    });
});


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW -shows maore info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});   
        }
    });
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Servar Has Started!");
});
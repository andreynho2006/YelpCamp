var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
    //res.render("campgrounds", {campgrounds: campgrounds});
    //get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

//CREATE ROUTE
router.post("/", isLoggedIn,function(req, res) {
    //get data from form add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {name: name, image: image, description: description, author: author};
    //create a new campgrounds and save it to DB
    Campground.create(newCampgrounds, function(err, newlyCreated) {
        if(err) {
            console.log("ERROR");
        } else {
            //redirect to campgrounds page
            //console.log(newlyCreated);
           res.redirect("/campgrounds"); 
        }
    });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW -shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});   
        }
    });
});

//Edit campground route

// UPDATE campground route


// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
};

module.exports = router;
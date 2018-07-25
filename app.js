var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var Localstrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var flash = require("connect-flash");

//requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); seed the database

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var campgrounds = [
        {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmXnA0nPXU41uscxsnX1loXVu9ddWJ2NrqS8UeOMTyySFLrUk"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7m0WfJxvQvAZY09mFtZ9F1QxpLAPS3-dROt684wAABdLIGrwB"},
        {name: "Granit Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9ZYROUpiiOIDwL3PPcqGkIQCvsEE1VrZUWRz8vT0cERillht"},
        {name: "Mountain Goat's Rest", image: "http://www.editionsblabla.fr/wp-content/uploads/2018/02/location-camping-pont-du-tarn-coco-sweet-min.jpg"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTLn-GXTBdOTezWA9cwF24B_lkk7Xh2sT-2SIPmQaUSw4mgvT"},
        {name: "Granit Hill", image: "https://www.quebecoriginal.com/en/listing/images/800x600/ae2894cf-af0a-46dc-904d-8a91b0059376/camping-parc-national-du-mont-tremblant-de-la-diable-camping-secteur-la-diable.jpg"},
        {name: "Mountain Goat's Rest", image: "https://cdn.vox-cdn.com/thumbor/G06ar5iSYGeKFUNi5Ubfji7b_V4=/0x0:3968x2976/1200x800/filters:focal(1667x1171:2301x1805)/cdn.vox-cdn.com/uploads/chorus_image/image/57016269/170817_GT_TIPI_01.0.jpg"}
    ];

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Servar Has Started!");
});

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
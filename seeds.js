var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
        { name : "Vatra Dornei",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoGQ1I0DJwhu9KUNdit5bk5eIRIrdExF0u3rQZ1_NcswkbZFL",
            description: "Summer place to go"
        },
        { name : "Gura Humorului",
            image: "https://i.guim.co.uk/img/static/sys-images/Travel/Pix/pictures/2013/5/1/1367398625863/Newgale-campsite-Pembroke-008.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=d8708c0675be2875b99d03b2b00254d5",
            description: "Beautifull wood"
        },
        { name : "Voronet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8WSavJdKSLdg8ihR28LlyaLU2aaB2hPOaHagw9YkKgQ_FTc3",
            description: "Lot of churchess"
        }
    ]

function seedDB(){
    
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("Remove campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added data");
                    //create a comment
                    Comment.create({
                        text: "this place is great, but I wish there was internet",
                        author: "Andrei Cirlan"
                    }, function(err, comment){
                       if(err) {
                           console.log(err);
                       } else {
                           campground.comments.push(comment);
                           campground.save();
                           console.log("created new comment");
                       }
                    });
                    
                }
            });
        });
    });
    
    //add a few comments
}

module.exports = seedDB;
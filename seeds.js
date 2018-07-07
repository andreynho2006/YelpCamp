var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
        { name : "Vatra Dornei",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoGQ1I0DJwhu9KUNdit5bk5eIRIrdExF0u3rQZ1_NcswkbZFL",
            description: "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
        },
        { name : "Gura Humorului",
            image: "https://i.guim.co.uk/img/static/sys-images/Travel/Pix/pictures/2013/5/1/1367398625863/Newgale-campsite-Pembroke-008.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=d8708c0675be2875b99d03b2b00254d5",
            description: "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
        },
        { name : "Voronet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8WSavJdKSLdg8ihR28LlyaLU2aaB2hPOaHagw9YkKgQ_FTc3",
            description: "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
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
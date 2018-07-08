var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// make a db user schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});


// add plugin to userschema to add functions to the "User"
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
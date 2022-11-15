const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema=new Schema({
    address: String,
    uniqueID: String,
    contact:Number,
    email:String,
    cityName:String,
    latitude:Number,
    longitude:Number,
    rating:Number
})

UserSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model('User',UserSchema)

/*
    db.users.updateOne({username:"rit5"},{$set:{rating:3.9}});
*/
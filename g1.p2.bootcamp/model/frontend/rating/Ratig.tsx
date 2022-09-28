import mongoose from "mongoose";
const RatingSchema = new mongoose.Schema({
    property_id :{
        type : String
    },
    rater_id  :{
        type : String
    },
    rating_at : {
        type : Date
    },
    rating    :{
        type : Number
    },
    status : {
        type : Number
    }
})

let Rating:any;

    try {
        Rating = mongoose.model("envRating");
    } catch (err) {
        Rating = mongoose.model("envRating", RatingSchema);
    }

export default Rating;
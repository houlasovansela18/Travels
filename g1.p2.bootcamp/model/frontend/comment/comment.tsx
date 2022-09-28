import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    cmt           :{
        type : String
    },
    property_id   :{
        type : String
    },
    cmt_by        :{
        type : String
    },
    cmt_at        :{
        type : String
    },
    status        :{
        type : Number
    },
})

let Review:any;

    try {
        Review = mongoose.model("review");
    } catch (err) {
        Review = mongoose.model("review", reviewSchema);
    }

export default Review;

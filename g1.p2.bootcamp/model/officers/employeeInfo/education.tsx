import mongoose from "mongoose";
const educationSchema = new mongoose.Schema({
    user_id       :{
        type : String
    },
    school        :{
        type : String
    },
    degree        :{
        type : String
    },
    certification :{
        type : Array
    },
    achivement    :{
        type : Array
    },
    created_by    :{
        type : String
    },
    created_at    :{
        type : Date
    },
})

let Education:any;

    try {
        Education = mongoose.model("education");
    } catch (err) {
        Education = mongoose.model("education", educationSchema);
    }

export default Education;
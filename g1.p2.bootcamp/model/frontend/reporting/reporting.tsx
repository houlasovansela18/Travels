import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
    user_id :{
        type : String
    },
    reporter_id  :{
        type : String
    },
    reported_at : {
        type : Date
    },
    report_reason    :{
        type : Text
    },
    status : {
        type : Number
    }
})

let reportUser:any;

    try {
        reportUser = mongoose.model("reported");
    } catch (err) {
        reportUser = mongoose.model("reported", reportSchema);
    }

export default reportUser;
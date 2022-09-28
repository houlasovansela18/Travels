import mongoose from "mongoose";
const hisEmployeeSchema = new mongoose.Schema({
    id             :{
        type :String
    },
    role           :{
        type : Number,
        require : true
    },
    name      :{
        type : String,
        require : true
    },
    phone_number    :{
        type : String,
    },
    email           :{
         type : String
    },
    add_id          :{
        type : String
    },
    edu_id          :{
        type : String
    },
    profile_url     :{
        type : String
    },
    cover_url       :{
        type : String
    },
    password        :{
        type : String
    },
    badlogin        :{
        type : Number
    },
    badlogin_expired:{
        type : Date
    },
    hardtoken : {
        type : String
    },
    session         :{
        type : String
    },
    session_ep      :{
        type : Date
    },
    created_by      :{
        type : String
    },
    created_date    :{
        type : Date
    },
    modified_by     :{
        type : String
    },
    modified_date   :{
        type : Date
    },
    error_message   :{
        type : String
    },
    rejected_reason :{
        type : String
    },
    is_active       :{
        type : Boolean
    },
    is_block        :{
        type : Boolean
    },
    status          :{
        type : Number
    }
})

let hisEmployee:any;

    try {
        hisEmployee = mongoose.model("hisEmployee");
    } catch (err) {
        hisEmployee = mongoose.model("hisEmployee", hisEmployeeSchema);
    }

export default hisEmployee;
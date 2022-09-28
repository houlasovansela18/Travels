import mongoose from "mongoose";

const userTMPSchema = new mongoose.Schema({
    role             :{
        type : Number,
        require : true
    },
    provider_id      :{
        type : String
    },
    first_name       :{
        type : String
    },
    last_name        :{
        type : String
    },
    phone_number     :{
        type : String
    },
    email            :{
        type : String
    },
    add_id           :{
        type : String
    },
    edu_id           :{
        type : String
    },
    profile_url      :{
        type : String
    },
    password         :{
        type : String
    },
    badlogin         :{
        type : Number
    },
    badlogin_expired :{
        type : Date
    },
    session          :{
        type : String
    },
    session_ep       :{
        type : Date
    },
    created_by       :{
        type : String
    },
    created_date     :{
        type : Date
    }, 
    modified_by      :{
        type : String
    },
    modified_date    :{
        type : Date
    },
    error_message    :{
        type : String
    },
    rejected_reason  :{
        type : String
    },
    is_active        :{
        type : Boolean
    },
    is_block         :{
        type : Boolean
    },
    status           :{
        type : Number
    }
})

let UserTMP:any;

    try {
        UserTMP = mongoose.model("userTMP");
    } catch (err) {
        UserTMP = mongoose.model("userTMP", userTMPSchema);
    }

export default UserTMP;
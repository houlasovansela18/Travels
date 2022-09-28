import mongoose from "mongoose";
const employeeTMPSchema = new mongoose.Schema({
    id             :{
        type   :String,
        unique : true
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

let EmployeeTMP:any;

    try {
        EmployeeTMP = mongoose.model("employeeTMP");
    } catch (err) {
        EmployeeTMP = mongoose.model("employeeTMP", employeeTMPSchema);
    }

export default EmployeeTMP;
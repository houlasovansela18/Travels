import mongoose from "mongoose";
const boostUNASchema = new mongoose.Schema({
    product_id     :{
        type : String
    },
    created_by     :{
        type : String
    },
    created_at     :{
        type : Date
    },
    modified_by    :{
        type : String
    },
    modified_at    :{
        type : Date
    },
    effective_date :{
        type : Date
    },
    boost_days     :{
        type : Number
    },
    is_vip         :{
        type : Boolean
    },
    is_actived     :{
        type : Boolean
    },
    zone           :{
        type : String
    },
    reject_reason  :{
        type : String
    },
    status         :{
        type : Number
    },
})

let boostUNA:any;

    try {
        boostUNA = mongoose.model("boosting");
    } catch (err) {
        boostUNA = mongoose.model("boosting", boostUNASchema);
    }

export default boostUNA;
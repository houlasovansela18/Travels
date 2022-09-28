import mongoose from "mongoose";
const couponUNASchema = new mongoose.Schema({
    code            :{
        type : String
    },
    discount_rate   :{
        type : Number
    },
    times           :{
        type : Number
    },
    durations       :{ // days
        type : Number
    },
    description     :{
        type : String
    },
    created_by      :{
        type : String
    },
    created_at      :{
        type : Date
    },
    modified_by     :{
        type : String
    },
    modified_at     :{
        type : Date
    },
    effective_date  :{
        type : Date
    },
    error_message   :{
        type : String
    },
    rejected_reason :{
        type : String
    },
    status          :{
        type : Number
    },
})

let CouponUNA:any;

    try {
        CouponUNA = mongoose.model("couponUNA");
    } catch (err) {
        CouponUNA = mongoose.model("couponUNA", couponUNASchema);
    }

export default CouponUNA;
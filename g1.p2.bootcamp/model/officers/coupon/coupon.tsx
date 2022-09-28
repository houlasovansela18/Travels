import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
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

let Coupon:any;

    try {
        Coupon = mongoose.model("coupon");
    } catch (err) {
        Coupon = mongoose.model("coupon", couponSchema);
    }

export default Coupon;
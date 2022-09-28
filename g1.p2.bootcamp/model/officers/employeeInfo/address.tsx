import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
    user_id       :{
        type : String
    },
    dob           :{
        type : Date
    },
    village       :{
        type : String
    },
    commune       :{
        type : String
    },
    district      :{
        type : String
    },
    province      :{
        type : String
    },
    national_id   :{
        type : String
    },
    national_card :{
        type : String
    },
    passport_id   :{
        type : String
    },
    passport_card :{
        type : String
    },
    created_by    :{
        type : String
    },
    creared_at    :{
        type : Date
    },
})

let Address:any;

    try {
        Address = mongoose.model("address");
    } catch (err) {
        Address = mongoose.model("address", AddressSchema);
    }

export default Address;
import connect from "../../config/db";

import CouponUNA from "../../model/officers/coupon/couponUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editApprCoupon = async (data:any)=>{
    try{
        await connect();
        let resp = CouponUNA.findOneAndUpdate({_id:data._id}, data);
        if(!resp){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status: Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data: null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default editApprCoupon;
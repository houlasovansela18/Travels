import connect from "../../config/db";
import CouponTMP from "../../model/officers/coupon/couponTMP";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let createCoupon = async (data:any)=>{
    try{
        await connect();
        let resp  = await CouponTMP.create(data);
        if(!resp){
            return error501('')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {code : data.code}
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default createCoupon;
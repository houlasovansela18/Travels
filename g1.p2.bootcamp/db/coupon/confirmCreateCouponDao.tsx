import connect from "../../config/db";
import boostTMP from "../../model/officers/boosting/boostingTMP";
import hisBoost from "../../model/officers/boosting/hisBoosting";
import CouponTMP from "../../model/officers/coupon/couponTMP";
import CouponUNA from "../../model/officers/coupon/couponUNA";
import hisCoupon from "../../model/officers/coupon/hisCoupon";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let confirmCreateCoupon = async (data: any)=>{
    try{
        await connect();
        let confirmCreate = await CouponUNA.create(data);
        if(!confirmCreate){
            return error501('Internal Server Error')
        }
        // remove from temp table 
        let rm = await CouponTMP.findOneAndDelete({_id:data._id})
        if(!rm){
            return error501("Internal Server Error")
        }
        // insert into history table
        await hisCoupon.create(data)

        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default confirmCreateCoupon;
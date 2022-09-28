import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import CouponUNA from "../../model/officers/coupon/couponUNA";
import hisCoupon from "../../model/officers/coupon/hisCoupon";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let apprCreateCoupon = async (data: any) =>{
    try{
        await connect();
        let approve = await Coupon.create(data);
        if(!approve){
            return error501('Internal Server Error')
        }
        let rmFromUNA = await CouponUNA.findOneAndDelete({_id:data._id})
        if(!rmFromUNA) {
            return error501('Internal Server Error')
        }
        await hisCoupon.create(data);
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode :  201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data: null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default apprCreateCoupon;
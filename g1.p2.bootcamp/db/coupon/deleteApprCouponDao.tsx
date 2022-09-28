import connect from "../../config/db";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import CouponUNA from "../../model/officers/coupon/couponUNA";
import hisCoupon from "../../model/officers/coupon/hisCoupon";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteApprCoupon = async (_id:String)=>{
    try{
        await connect();
        let resp = await CouponUNA.findOneAndDelete({_id:_id});
        if(!resp){
            return error404('Data Not Found')
        }
        resp.created_at = new Date();
        await hisCoupon.create(resp)
        return {
             resultMessage  : {
                status : Status.SUCCESS,
                statusCode: 201,
                errorMessage : '',
                message  : 'SUCCESS'
             },
             data: null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default deleteApprCoupon;
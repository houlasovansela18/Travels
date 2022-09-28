import connect from "../../config/db";
import CouponUNA from "../../model/officers/coupon/couponUNA";
import hisCoupon from "../../model/officers/coupon/hisCoupon";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let rejectApprCoupon = async (data:any)=>{
    try{
        await connect();
        let resp = await CouponUNA.findOneAndUpdate({_id:data._id}, data);
        if(!resp){
            return error501('Internal Server Error')
        }
        await hisCoupon.create(data);
        return {
            resultMessage :{
                status : Status.SUCCESS,
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

export default rejectApprCoupon;
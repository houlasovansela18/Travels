import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import error403 from "../../utils/error403";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getCouponDetail = async (params :any)=>{
    try{
        await connect();
        let resp = await Coupon.findOne(params)
        if(!resp){
            return error403('Invalid Request')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {
                code : resp.code ,
                discount_rate : resp.discount_rate,
                times : resp.times,
                durations : resp.durations,
                description : resp.description,
                effective_date : resp.effective_date
            }
        }
    }catch(e){
        return error501('Internal Server Error')
    }

}
export default getCouponDetail;
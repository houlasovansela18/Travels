import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let findCouponByCode  = async (code :String)=>{
    try{
        await connect();
        let resp = await Coupon.findOne({code : code})
        if(!resp){
            return error404("Coupon Not Found")
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default findCouponByCode;
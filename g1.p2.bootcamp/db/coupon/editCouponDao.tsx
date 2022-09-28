import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editCoupon = async (data:any)=>{
    try{
        await connect();
        let resp = Coupon.findOneAndUpdate({_id:data._id}, data);
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

export default editCoupon;
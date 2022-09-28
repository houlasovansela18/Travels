import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import hisCoupon from "../../model/officers/coupon/hisCoupon";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteCoupon = async (_id:String)=>{
    try{
        await connect();
        let resp = await Coupon.findOneAndDelete({_id:_id});
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

export default deleteCoupon;
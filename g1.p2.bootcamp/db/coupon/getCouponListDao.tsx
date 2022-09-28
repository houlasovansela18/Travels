import connect from "../../config/db";
import Coupon from "../../model/officers/coupon/coupon";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getCouponList = async (params:any)=>{
    try{
        await connect();
        let resp ;
        params.search.length ===0 ? 
        resp = await Coupon.find({status : params.status})
                           .skip(params.skip)
                           . limit(params.limit)
        :
        resp = await Coupon.find({
                                status : params.status,
                                $or: [
                                    {created_by : { "$regex": params.search, "$options": "i" }},
                                    {code : { "$regex": params.search, "$options": "i" }},
                                    {discount_rate : { "$regex": params.search, "$options": "i" }},
                                    {times : { "$regex": params.search, "$options": "i" }},
                                    {durations : { "$regex": params.search, "$options": "i" }},
                                    {description : { "$regex": params.search, "$options": "i" }},
                                ]
                            })
                           .skip(params.skip)
                           .limit(params.limit)

        if(!resp){
            return error404('Coupon List Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}
export default getCouponList;
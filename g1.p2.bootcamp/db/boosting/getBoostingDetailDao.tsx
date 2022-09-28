import connect from "../../config/db";
import Boost from "../../model/officers/boosting/boosting";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getBoostingDetail = async (params:any)=>{
    try{
        await connect();
        const resp = await Boost.findOne(params)
        if(!resp){
            return error404('Data Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {
                created_by    : resp.created_by,
                created_at    : resp.created_at,
                effective_at  : resp.effective_date,
                boosting_dats : resp.boost_days,
                is_vip        : resp.is_vip,
                zone          : resp.zone
            }
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getBoostingDetail;
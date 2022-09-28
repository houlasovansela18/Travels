import connect from "../../config/db";
import Boost from "../../model/officers/boosting/boosting";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import hisBoost from "../../model/officers/boosting/hisBoosting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let apprCreateBts = async (data: any) =>{
    try{
        await connect();
        let approve = await Boost.create(data);
        if(!approve){
            return error501('Internal Server Error')
        }
        let rmFromUNA = await boostUNA.findOneAndDelete({_id:data._id})
        if(!rmFromUNA) {
            return error501('Internal Server Error')
        }
        await hisBoost.create(data);
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

export default apprCreateBts;
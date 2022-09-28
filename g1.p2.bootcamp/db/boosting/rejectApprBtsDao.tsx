import connect from "../../config/db";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import hisBoost from "../../model/officers/boosting/hisBoosting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let rejectApprBts = async (data:any)=>{
    try{
        await connect();
        let resp = await boostUNA.findOneAndUpdate({_id:data._id}, data);
        if(!resp){
            return error501('Internal Server Error')
        }
        await hisBoost.create(data);
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

export default rejectApprBts;
import connect from "../../config/db";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editApprBts = async (data:any)=>{
    try{
        await connect();
        let resp = boostUNA.findOneAndUpdate({_id:data._id}, data);
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

export default editApprBts;
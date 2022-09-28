import connect from "../../config/db";
import boostTMP from "../../model/officers/boosting/boostingTMP";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let createBoosting = async (params:any)=>{
    try{
        await connect();
        let resp = await boostTMP.create(params);
        if(!resp){
            return error501('Insternal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage  : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default createBoosting;
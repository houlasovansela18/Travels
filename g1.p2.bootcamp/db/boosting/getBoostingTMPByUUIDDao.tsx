import connect from "../../config/db";
import boostTMP from "../../model/officers/boosting/boostingTMP";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getBoostingByUUID = async (_id:String)=>{
    try{
        await connect()
        let resp = await boostTMP.findOne({_id:_id});
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
            data: resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getBoostingByUUID;
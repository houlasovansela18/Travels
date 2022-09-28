import connect from "../../config/db";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let getBoostingUNAByUUID =async (_id:String)=>{
    try{
        await connect();
        let resp = await boostUNA.findOne({_id:_id});
        if(!resp){
            return error404('Data Not Found')
        }
        return {
            resultMessage  : {
                status: Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data: resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getBoostingUNAByUUID;
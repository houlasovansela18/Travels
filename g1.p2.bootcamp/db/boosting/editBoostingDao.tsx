import connect from "../../config/db";
import Boost from "../../model/officers/boosting/boosting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editBoosting = async (data:any)=>{
    try{
        await connect();
        let resp = Boost.findOneAndUpdate({_id:data._id}, data);
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

export default editBoosting;
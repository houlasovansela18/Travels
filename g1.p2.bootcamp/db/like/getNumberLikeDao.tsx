import connect from "../../config/db";
import Like from "../../model/frontend/like";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getNumberLike = async (params:any)=>{
    try{
        await connect();
        let resp = await Like.find(params).count();
        if(!resp){
            return {
                resultMessage  : {
                    status : Status.SUCCESS,
                    statusCode : 201,
                    errorMessage : '',
                    message : 'SUCCESS'
                },
                data : 0
            }
        }
        return {
            resultMessage  : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }

    }catch(e){
        return error501("Internal Server Error")
    }
}

export default getNumberLike;
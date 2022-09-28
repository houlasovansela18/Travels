import connect from "../../config/db";
import Like from "../../model/frontend/like";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteLike = async (params:any)=>{
    try{
        await connect();
        let resp = await Like.findOneAndDelete(params);
        
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default deleteLike;
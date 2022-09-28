import connect from "../../config/db";
import Like from "../../model/frontend/like";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getLikeDetail = async (params : any) =>{
    try{
        await connect();
        let resp = await Like.findOne(params);
        if(!resp){
            return error404('Data Not Found')
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
    }
    catch(e){
        return error501('Internal Server Error')
    }
}

export default getLikeDetail;
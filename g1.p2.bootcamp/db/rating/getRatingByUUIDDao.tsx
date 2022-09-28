import connect from "../../config/db";
import Review from "../../model/frontend/comment/comment";
import Rating from "../../model/frontend/rating/Ratig";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getRatingByUUID   = async (_id : String) =>{
    try{
        await connect();
        let resp = await Rating.findOne({_id:_id})
        if(!resp){
            return error404('Review Not Found')
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
        return error501('Internal Server Error')
    }
}

export default getRatingByUUID;
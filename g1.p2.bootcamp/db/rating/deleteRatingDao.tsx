import connect from "../../config/db";
import Rating from "../../model/frontend/rating/Ratig";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteRating = async (_id:String)=>{
    try{
        await connect();
        let resp = await Rating.findOneAndDelete({_id : _id})
        if(!resp){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default deleteRating;
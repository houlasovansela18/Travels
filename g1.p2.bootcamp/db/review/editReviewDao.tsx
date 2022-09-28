import connect from "../../config/db";
import Review from "../../model/frontend/comment/comment";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editReview = async (data:any)=>{
    try{
        await connect();
        let resp = await Review.findOneAndUpdate({_id:data._id}, data);
        if(!resp){
            return error501("Internal Server Error")
        }

        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage  : '',
                message: 'SUCCESSS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}


export default editReview;
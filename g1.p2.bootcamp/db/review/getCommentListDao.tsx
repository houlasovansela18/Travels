import connect from "../../config/db";
import Review from "../../model/frontend/comment/comment";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getCommentsList = async (params:any)=>{
    try{
        await connect();
        let resp = await Review.find({property_id: params._id})
        .skip(params.skip)
        .limit(params.limit)

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
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getCommentsList;
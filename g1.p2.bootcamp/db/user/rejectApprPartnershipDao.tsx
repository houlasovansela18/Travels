import connect from "../../config/db";
import UserUNA from "../../model/frontend/user/userUNA";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let rejectApprPartnership = async (data:any)=>{
    try{
        await connect();
        let resp = await UserUNA.findOneAndUpdate({_id : data._id}, data)
        if(!resp){
            return error404('Cannot Reject, try again')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
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

export default rejectApprPartnership;
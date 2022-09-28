import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let findUserByUUID = async (_id:String) =>{
    try {
        await connect();
        let resp = await User.findOne({_id:_id})
        if(!resp){
            return error404('User not found')
        }
        return  {
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

export default findUserByUUID;
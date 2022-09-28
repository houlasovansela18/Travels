
import connect from "../../config/db";
import UserUNA from "../../model/frontend/user/userUNA";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let findUserUNAByUUID = async (_id:String)=>{
    try{
        await connect();
        let resp = await UserUNA.findOne({_id:_id})
        if(!resp){
            return error404('User not Found')
        }
        return {
            resultMessage: {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'CanCel Request Partnership Success'
            },
            data: resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default findUserUNAByUUID;
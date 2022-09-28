import connect from "../../config/db";
import UserTMP from "../../model/frontend/user/userTMP";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteUserFromTMP = async (params:any)=>{
    try{
        await connect()
        let resp = await UserTMP.findOneAndDelete(params);
        if(!resp){
            return error501('Cannot Delete User')
        }
        return {
            resultMessage : {
                status: Status.SUCCESS,
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

export default deleteUserFromTMP;
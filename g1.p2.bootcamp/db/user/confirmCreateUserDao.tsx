import connect from "../../config/db";
import UserTMP from "../../model/frontend/user/userTMP";
import UserUNA from "../../model/frontend/user/userUNA";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let confirmCreateUserDao = async (data:any)=>{
    try{
        await connect();
        let una = await UserUNA.create(data);
        if(!una){
            return error501('Cannot create user')
        }
        await UserTMP.findOneAndDelete({_id:data._id})
        return  {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data:null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default confirmCreateUserDao;
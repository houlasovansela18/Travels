import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let getUserByEmail = async (email:String)=>{
    try{
        await connect()
        let resp = await User.findOne({email : email})
        if(!resp){
            return error404('User Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode  : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getUserByEmail;
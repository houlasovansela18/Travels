import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let userSignout = async (user:any)=>{
    try{
        await connect();
        let resp = await User.findOneAndUpdate({_id:user._id}, user);
        if(!resp){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default userSignout;
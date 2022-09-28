import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let updateUser = async (_id:String, data : any)=>{
    try{
        await connect();
        let resp  = await User.findOneAndUpdate({_id:_id}, data)
        if(!resp){
            return error404("Login Fail")
        }
        return  {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : data.session
        }

    }catch(e){
        return error501("Internal Server Error")
    }
}

export default updateUser;
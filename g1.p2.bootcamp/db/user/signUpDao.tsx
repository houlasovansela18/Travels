import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let signUp = async (data:any)=>{
    try{
        await connect();
        let resp = await User.create(data)
        if(!resp){
            return error501('Cannot create user')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501("Internal Server Error")
    }
}

export default signUp;
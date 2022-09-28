import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let createUserWithProvider = async (params:any)=>{
    try{
        await connect();
        let resp = await User.create(params);
        if(!resp){
            return error501("Cannot log in with google, try again")
        }
        return {
            resultMessage : {
                status: Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : "SUCCESS"
            },
            data : resp
        }
    }catch(e){
        return error501("Internal Server Error")
    }
}

export default createUserWithProvider;
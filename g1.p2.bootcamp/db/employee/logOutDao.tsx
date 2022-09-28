import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let logOut = async (user:any)=>{
    try{
        await connect();
        let resp = await Employee.findOneAndUpdate({id:user.id}, user);
        if(!resp){
            return error501('Cannot Logout')
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

export default logOut;
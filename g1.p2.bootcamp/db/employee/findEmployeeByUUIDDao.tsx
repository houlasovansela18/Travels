import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let findEmployeeByUUID = async (_id:String) =>{
    try {
        //connect to pool
        await connect();
        let user = await Employee.findOne({_id : _id})
        if(!user){
            return error404('')
        }

        return {
            resultMessage  : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : user
        }
    }catch(e){
        return error501('')
    }
}

export default findEmployeeByUUID;
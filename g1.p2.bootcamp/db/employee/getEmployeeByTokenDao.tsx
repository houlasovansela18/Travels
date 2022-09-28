import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEmployeeByToken = async (token:String)=>{
    try{
        await connect();
        let resp = await Employee.findOne({session:token})
        
        if(!resp){
            return error404('Employee not found')
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

export default getEmployeeByToken;
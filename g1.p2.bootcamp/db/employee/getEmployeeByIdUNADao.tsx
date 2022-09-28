import connect from "../../config/db";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";

let getEmployeeByIdUNA = async (id : String) =>{
    try {
        await connect();
        let resp = await EmployeeUNA.findOne({id : id})
        if(!resp){
            return error404('User not found')
        }
        return {
            resultMessage  : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error.')
    }
}
export default getEmployeeByIdUNA;
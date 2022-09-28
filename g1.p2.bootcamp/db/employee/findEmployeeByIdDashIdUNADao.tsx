import connect from "../../config/db";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let findById =async (params:any) => {
    try{
        await connect();
        let resp = await EmployeeUNA.findOne(params);
        if(!resp){
            return error404('User not found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage  : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default findById;
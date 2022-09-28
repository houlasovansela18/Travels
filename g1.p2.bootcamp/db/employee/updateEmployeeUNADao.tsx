import connect from "../../config/db";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let updateEmployeeDao = async (id : String, updateData:any) =>{
    try {
        //connect to  pool
        await connect();
        
        let updateUser = await EmployeeUNA.findOneAndUpdate({id:id}, updateData);
        if(!updateUser){
            return error501('')
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
        return error501('')
    }
}

export default updateEmployeeDao;
import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";
import hisEmployee from "../../model/officers/employee/hisEmployee";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let approveCreate = async (user:any) => {
    try {
        await connect();
        let resp = await Employee.create(user);
        if(!resp){
            return error501('Cannot approve user, Internal server Error')
        }
        let rmUNA = await EmployeeUNA.findOneAndDelete({_id:user._id});
        if(!rmUNA){
            return error501('Cannot approve user, Internal server Error')
        }
        await hisEmployee.findOneAndUpdate({_id:user._id},user)
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
        return error501('Internal Server Error')
    }
}

export default approveCreate;
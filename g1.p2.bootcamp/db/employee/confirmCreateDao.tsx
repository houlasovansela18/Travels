import connect from "../../config/db";
import EmployeeTMP from "../../model/officers/employee/employeeTMP";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";
import hisEmployee from "../../model/officers/employee/hisEmployee";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let confirmCreateDao = async (user:any) => {
    try{
        await connect();
        // insert data to una 

        let insertUNA = await EmployeeUNA.create(user);
        if(!insertUNA){
            return error501('Cannot Comfirm Create Employee')
        }

        // remove data from tmp
        let deleteTMP = await EmployeeTMP.findOneAndDelete({
            created_by : user.created_by
        });
        if(!deleteTMP){
            return error501('Internal Server Error');
        }
        // insert data to his
        let insertHis = await hisEmployee.create(user)
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

export default confirmCreateDao;
import connect from "../../config/db"
import EmployeeTMP from "../../model/officers/employee/employeeTMP";
import error403 from "../../utils/error403";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let findEmployeeByIdTMP =async (params:any) => {
    try{
        await connect();
        let resp = await  EmployeeTMP.findOne(params);
        if(!resp){
            return error403('Invalid Request')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode  : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default findEmployeeByIdTMP; 
import connect from "../../config/db";
import EmployeeTMP from "../../model/officers/employee/employeeTMP";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let deleteFromTMPDao =async (params:any) => {
    try {
        await connect();
        let deleteTMP = await EmployeeTMP.findOneAndDelete(params);
        if(!deleteTMP){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage: '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default deleteFromTMPDao;
import connect from "../../config/db";
import EmployeeUNA from "../../model/officers/employee/employeeUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let rejectCreatingDao = async (user:any) =>{
    try{
        await connect();
        let resp = await EmployeeUNA.findOneAndUpdate({_id: user._id}, user)
        
        if(!resp){
            return error501('Internal Server Error');
        }

        return {
            resultMessage: {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error.')
    }
}

export default rejectCreatingDao;
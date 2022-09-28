import connect from "../../config/db";
import Education from "../../model/officers/employeeInfo/education";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let updateEmployeeEdu = async (params:any) => {
    try {
        await connect();
        let resp = await Education.findOneAndUpdate({_id : params._id}, params)
        if(!resp){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data  : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default updateEmployeeEdu;
import connect from "../../config/db";
import Education from "../../model/officers/employeeInfo/education";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let createEdu = async (data:any)=>{
    try {
        await connect();
        let resp = await Education.create(data);
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
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default createEdu
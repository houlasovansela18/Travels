import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let getEmployeeByEmail = async (email:String) => {
    try{
        await connect();
        let user = await Employee.findOne({email:email})
        if(!user){
            return error404("User Not Found.")
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

export default getEmployeeByEmail;
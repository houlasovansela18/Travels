import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error403 from "../../utils/error403";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let confirmHardTokenDao = async (param:any)=>{
    try{
        // connet to pool
        await connect();
        let employee = await Employee.findOne(param);
        if(!employee){
            return error403('')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage: '',
                message : 'SUCCESS'
            },
            data : employee.session
        }
    }catch(e){
        return error501('')
    }
}

export default confirmHardTokenDao;
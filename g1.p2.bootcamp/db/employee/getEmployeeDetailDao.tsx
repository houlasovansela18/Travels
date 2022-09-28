import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEmployeeDetail = async (params:any)=>{
    try{
        await connect()
        let resp = await Employee.findOne(params);
        if(!resp){
            return error404('Employee Not Found')
        }
        return {
            resultMessage: {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {
                id : resp.id,
                role : resp.role,
                name : resp.name,
                phone_number : resp.phone_number,
                email : resp.email,
                edu_id : resp.edu_id,
                add_id : resp.add_id,
                profile_url : resp.profile_url,
                cover_url : resp.cover_url

            }
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getEmployeeDetail;
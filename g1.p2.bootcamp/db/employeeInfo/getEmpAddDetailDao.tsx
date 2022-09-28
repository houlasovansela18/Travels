import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEmpAddDetail = async (_id : String)=>{
    try{
        await connect();
        let resp = Employee.findOne({_id:_id})
        if(!resp){
            return error404('Employee Not Found')
        }
        return {
            resultMessage : {
                status: Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {
                user_id : resp.user_id,
                dob : resp.dob,
                village : resp.village,
                commune : resp.commune,
                district : resp.district,
                province : resp.province,
                national_id : resp.national_id,
                national_card : resp.national_card,
                passport_id : resp.passport_id,
                passport_card : resp.passport_card
            }
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getEmpAddDetail;
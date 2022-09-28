import connect from "../../config/db";
import Education from "../../model/officers/employeeInfo/education";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEmpEduDetail = async (_id:String)=>{
    try{
        await connect();
        let resp = await Education.findOne({_id:_id})
        if(!resp){
            return error404('Employee Education Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : {
                user_id : resp.user_id,
                school : resp.school,
                degree : resp.degree,
                certification : resp.certification,
                achivement : resp.achivement
            }
        }
    }catch(e){
        return error501("Internal Server")
    }
}

export default getEmpEduDetail;
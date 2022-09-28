import connect from "../../config/db";
import Education from "../../model/officers/employeeInfo/education";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let findEmpEduByUUID = async (_id:String)=>{
    try{
        await connect();
        let resp = await Education.findOneAndUpdate({_id : _id})
        if(!resp){
            return error404('Address Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message  : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default findEmpEduByUUID;
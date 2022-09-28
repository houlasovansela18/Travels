import connect from "../../config/db";
import reportUser from "../../model/frontend/reporting/reporting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";


let createReporting = async (data:any)=>{
    try{
        await connect();
        let resp = await reportUser.create(data);
        if(!resp){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage  : '',
                message: 'SUCCESSS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }

}

export default createReporting;
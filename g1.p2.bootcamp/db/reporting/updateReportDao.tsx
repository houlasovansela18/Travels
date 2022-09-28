import connect from "../../config/db";
import reportUser from "../../model/frontend/reporting/reporting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let updateReport  = async (data:any)=>{
    try{
        await connect();
        let update = await reportUser.findOneAndUpdate({_id:data._id}, data)
        if(!update){
            return error501('Internal Server Error')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage :'',
                message : 'SUCCESS' 
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default updateReport;
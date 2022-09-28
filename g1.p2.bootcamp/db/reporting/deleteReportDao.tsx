import connect from "../../config/db";
import reportUser from "../../model/frontend/reporting/reporting";
import error403 from "../../utils/error403";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteReport = async (_id:String)=>{
    try{
        await connect();
        let resp = await reportUser.findOneAndDelete({_id:_id});
        if(!resp){
            return error403('Invalid Request')
        }
        return {
            resultMessage : {
                status  : Status.SUCCESS,
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

export default deleteReport;
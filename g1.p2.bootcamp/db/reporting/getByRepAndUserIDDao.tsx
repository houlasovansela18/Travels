import connect from "../../config/db";
import reportUser from "../../model/frontend/reporting/reporting";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let getByRepAndUserID  =async (params:any) => {
    try{
        await connect();
        let resp = await reportUser.findOne(params);
        if(!resp){
            return error404('Data Not Found')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getByRepAndUserID;
import connect from "../../config/db";
import Branch from "../../model/frontend/properties/branch";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let createBranch = async (data:any)=>{
    try{
        await connect();
        let resp = Branch.create(data);
        if(!resp){
            return error501('Internal Server Error')
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


export default createBranch;
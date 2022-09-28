import connect from "../../config/db";
import Branch from "../../model/frontend/properties/branch";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editBranch = async (data:any)=>{
    try{
        await connect();
        let resp = await Branch.findOneAndUpdate({_id : data._id}, data)
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
            data: null
        }
    }catch(e){
        return error501("Internal Server Error")
    }
}

export default editBranch;
import connect from "../../config/db";
import Address from "../../model/officers/employeeInfo/address";
import error501 from "../../utils/error501"
import Status from "../../utils/Status";

let updateEmployeeAdd = async (_id : String)=>{
    try{
        await connect();
        let resp = await Address.findOneAndDelete({_id: _id})
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

export default updateEmployeeAdd;
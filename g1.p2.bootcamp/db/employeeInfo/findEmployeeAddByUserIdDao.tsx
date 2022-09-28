import connect from "../../config/db";
import Address from "../../model/officers/employeeInfo/address";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let findEmployeeAddByUserId = async (id:String)=>{
    try{
        await  connect();
        let resp = await Address.findOne({id:id})
        if(!resp){
            return error404('Address Not Found')
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
export default findEmployeeAddByUserId;
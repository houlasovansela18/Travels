import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let createProperty = async (data:any)=>{
    try{
        await connect();
        let resp = await Property.create(data);
        if(!resp){
            return error501('Internal Server Error')
        }
        return  {
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

export default createProperty;
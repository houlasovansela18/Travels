import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let editProperty = async (data:any)=>{
    try{
        await connect()
        let resp = await Property.findOneAndUpdate({_id:data._id}, data);
        if(!resp){
            return error501('Cannot Update Property')
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
        return error501("Inrernal Server Error")
    }
}

export default editProperty;
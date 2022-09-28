import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let deleteProperty = async (_id:String)=>{
    try{
        await connect();
        let resp = await Property.findOneAndDelete({_id:_id});
        if(!resp){
            return error501('Cannot Delete Property')
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

export default deleteProperty;
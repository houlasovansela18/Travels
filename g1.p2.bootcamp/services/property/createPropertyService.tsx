import createPropertyDao from '../../db/properties/createPropertyDao';
import FRole from '../../utils/FRole';
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
let createProperty = async (creator:any , data:any)=>{
    //auth 
    if(creator.role !== FRole.Partner){
        return errorUnauthorized('Unauthorized User')
    }
    // checking valid data 
    data.created_by =creator._id;
    data.created_at = new Date();
    data.status     = IntStatus.SUCCESS;

    let resp = await createPropertyDao(data);

    return resp;
}

export default createProperty;
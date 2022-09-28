import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import getPropertyByUUID from "../../db/properties/getPropertyByUUIDDao";
import deletePropertyDao from '../../db/properties/deletePropertyDao';
import FRole from '../../utils/FRole';

let deleteProperty = async (deletor :any, _id:String)=>{
    // auth
    if(deletor.role !== FRole.Partner){
        return errorUnauthorized('Unauthorized User')
    }
    // check if branch is existed 
    let isExisted = await getPropertyByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    // deletor
    if(deletor._id !== isExisted.data.created_by){
        return errorUnauthorized('Unauthorized User')
    }
    let resp = await deletePropertyDao(_id);
    return resp;
}

export default deleteProperty;
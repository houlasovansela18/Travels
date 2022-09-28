import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getBoostingByUUID from "../../db/boosting/getBoostingTMPByUUIDDao";
import editBoostingDao from '../../db/boosting/editBoostingDao';


let editBoosting = async (editor:any, _id:String, data:any)=>{
    // check auth
    if(editor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if it is existed
    let isExisted = await getBoostingByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   data.created_by = editor.id;
   data.created_at = new Date();
   data.status     = IntStatus.PENDING;
   data._id = _id;

   let resp = await editBoostingDao(data.toJSON());

   return resp;
}

export default editBoosting;
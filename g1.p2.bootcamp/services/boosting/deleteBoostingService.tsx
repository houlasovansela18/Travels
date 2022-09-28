import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getBoostingByUUID from "../../db/boosting/getBoostingTMPByUUIDDao";
import deleteBoostingDao from '../../db/boosting/deleteBoostingDao';

let editBoosting = async (deletor:any, _id:String)=>{
    // check auth
    if(deletor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if it is existed
    let isExisted = await getBoostingByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }


   let resp = await deleteBoostingDao(_id);

   return resp;
}

export default editBoosting;
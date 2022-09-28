import errorUnauthorized from "../../utils/errorUnauthorized";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import getBoostingTMPByUUIDDao from '../../db/boosting/getBoostingTMPByUUIDDao';
import confirmCreateBstDao from '../../db/boosting/confirmCreateBstDao';

let confirmCreateBst = async (approver:any , _id:String)=>{

    // if authorized
    if(approver.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check item is existed
    let isExist = await getBoostingTMPByUUIDDao(_id);
    if(isExist.resultMessage.status !== Status.SUCCESS){
        return isExist;
    }
    
    // confirmCreate
    let data = isExist.data.toJSON();
    data.created_at = new Date();
    let resp = await confirmCreateBstDao(data);

    return resp;
}

export default confirmCreateBst;
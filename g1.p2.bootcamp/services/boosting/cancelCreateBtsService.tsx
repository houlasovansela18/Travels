import getBoostingTMPUUIDDao from '../../db/boosting/getBoostingTMPByUUIDDao';
import errorUnauthorized from '../../utils/errorUnauthorized';
import Status from '../../utils/Status';
import cancelCreateBtsDao from '../../db/boosting/cancelCreateBtsDao';
import Role from '../../utils/Role';
let cancelCreateBts = async (deletor:any, _id:String)=>{
    // check if item is existed
    let isExisted = await getBoostingTMPUUIDDao(_id);

    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    // check auth 
    if(deletor.role === Role.Normal){

        if(deletor.id !== isExisted.data.created_by){
            return errorUnauthorized('Unauthorized User')
        }

    }
    
    let resp = await cancelCreateBtsDao(_id);

    return resp;
}

export default cancelCreateBts;
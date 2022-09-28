import getBoostingUNAByUUID from "../../db/boosting/getBoostingUNAByUUIDDao";
import Status from "../../utils/Status";
import deleteApprBtsDao from '../../db/boosting/deleteApprBtsDao';

let deleteApprBts = async (_id:String)=>{
    // check if it is existed
    let isExisted = await getBoostingUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   let resp = await deleteApprBtsDao(_id);

   return resp;
}

export default deleteApprBts;
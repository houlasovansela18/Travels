import getBoostingUNAByUUID from "../../db/boosting/getBoostingUNAByUUIDDao";
import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import editApprBtsDao from '../../db/boosting/editApprBtsDao';

let editApprBts = async (editor:any, _id:String, data:any)=>{
    // check if it is existed
    let isExisted = await getBoostingUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   data.created_by = editor.id;
   data.created_at = new Date();
   data.status     = IntStatus.PENDING;
   data._id = _id;

   let resp = await editApprBtsDao(data.toJSON());

   return resp;
}

export default editApprBts;
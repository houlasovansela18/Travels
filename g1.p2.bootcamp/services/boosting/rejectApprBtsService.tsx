import getBoostingUNAByUUID from "../../db/boosting/getBoostingUNAByUUIDDao";
import error404 from "../../utils/error404";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import rejectApprBtsDao from '../../db/boosting/rejectApprBtsDao';

let rejectApprBts = async (rejector:any, _id:String, reject_reason:String)=>{
    // check auth 
    if(rejector.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if data is existed
    let isExisted = await getBoostingUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return error404("Data Not Found")
    }
    
    let data = isExisted.data;
    data.modified_by = rejector.id;
    data.modified_at = new Date();
    data.reject_reason = reject_reason;
    data.status = IntStatus.REJECTED;
    data._id = _id;

    let resp =  await rejectApprBtsDao(data.toJSON());
    return resp;
}

export default rejectApprBts;
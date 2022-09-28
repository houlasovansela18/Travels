import error404 from "../../utils/error404";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import getBoostingUNAByUUIDDao from '../../db/boosting/getBoostingUNAByUUIDDao';
import apprCreateBtsDao from '../../db/boosting/apprCreateBtsDao';

let apprCreateBts = async (approver:any, _id:String)=>{
    // check auth 
    if(approver.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if item is existed
    let isExisted = await getBoostingUNAByUUIDDao(_id);

    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return error404('Data Not Found')
    }

    let data = isExisted.data;
    data.modified_by = approver.id;
    data.modified_at = new Date();
    data.effective_date = new Date();
    data.status = IntStatus.SUCCESS;

    let resp = await apprCreateBtsDao(data);

    return resp;
}

export default apprCreateBts;
import findUserUNAByUUID from "../../db/user/findUserUNAByUUIDDao";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import rejectApprPartnershipDao from '../../db/user/rejectApprPartnershipDao';

let rejectApprPartnership = async (modifier:any, _id:String, reject_reason:String)=>{
    // auth
    if(modifier.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }


    // if user existed
    let isExisted = await findUserUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    let data = isExisted.data;
    
    data.modified_by = modifier.id;
    data.modified_date = new Date();
    data.rejected_reason = reject_reason;
    data.status = IntStatus.REJECTED;

    let resp = await rejectApprPartnershipDao(data.toJSON());
    return resp;
}

export default rejectApprPartnership;
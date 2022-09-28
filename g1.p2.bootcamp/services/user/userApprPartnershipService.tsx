import findUserUNAByUUID from "../../db/user/findUserUNAByUUIDDao";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import userApprPartnershipDao from '../../db/user/userApprPartnershipDao';

let userApprPartnership = async (modifier:any, _id:String)=>{
    // auth
    if(modifier.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if exist
    let isExisted = await findUserUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    let data = isExisted.data;
    data.modified_by = modifier.id;
    data.modified_at = new Date();
    data.status = IntStatus.SUCCESS;
    data.reject_reason = null;

    let resp = await userApprPartnershipDao(data.toJSON());
    return resp;
}

export default userApprPartnership;
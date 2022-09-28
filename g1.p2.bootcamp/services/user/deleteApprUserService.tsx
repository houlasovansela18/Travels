import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import findUserUNAByUUID from "../../db/user/findUserUNAByUUIDDao";
import deleteApprUserDao from '../../db/user/deleteApprUserDao';

let deleteApprUser = async (deletor:any, _id:String)=>{
    // auth
    if(deletor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }


    // if user existed
    let isExisted = await findUserUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    let resp = await deleteApprUserDao(_id);
    return resp;

}

export default deleteApprUser;
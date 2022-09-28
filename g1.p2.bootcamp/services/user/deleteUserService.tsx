import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import findUserByUUID from "../../db/user/findUserByUUID";
import deleteUserDao from '../../db/user/deleteUserDao';

let deleteApprUser = async (deletor:any, _id:String)=>{
    // auth
    if(deletor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }


    // if user existed
    let isExisted = await findUserByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    let resp = await deleteUserDao(_id);
    return resp;

}

export default deleteApprUser;
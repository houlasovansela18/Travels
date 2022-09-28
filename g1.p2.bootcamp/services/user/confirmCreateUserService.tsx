import error501 from "../../utils/error501";
import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import findUserTMP from '../../db/user/findUserTMPDao';
import confirmCreateUserDao from '../../db/user/confirmCreateUserDao';
let confirmCreateUser= async (creator: any, _id : String)=>{

    // check if confirm and creator is the same person
    let predata = {
        created_by : creator.id,
        _id  : _id
    }
    let userResp = await findUserTMP(predata);
    if(userResp.resultMessage.status !== Status.SUCCESS){
        return errorUnauthorized('Unauthorize user')
    }
    // insert into una table, waiting for approving
    let data = userResp.data;
    let unaResp = await confirmCreateUserDao(data.toJSON());
    if(unaResp.resultMessage.status !== Status.SUCCESS){
        return error501('Internal Server Error')
    }

    return unaResp;

}

export default confirmCreateUser;
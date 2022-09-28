import getUserByEmail from "../../db/user/getUserByEmailDao";
import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import userSignoutDao from '../../db/user/userSignoutDao';
import error403 from "../../utils/error403";

let userSignout = async (user:any)=>{
    // check if user is exist
    let getUserResp = await getUserByEmail(user.email);
    if(getUserResp.resultMessage.status !== Status.SUCCESS){
        return errorUnauthorized('Invalid Request')
    }
    
    if(getUserResp.data.session === null || getUserResp.data.session === ""){
        return error403("Session Expired")
    }
    let data = getUserResp.data.toJSON();
    data.session = '';
    data.session_ep = null;

    let resp = await userSignoutDao(data);

    return resp;
}

export default userSignout;
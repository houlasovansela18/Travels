import error404 from "../../utils/error404";
import Status from "../../utils/Status";
import findUserTMPDao from '../../db/user/findUserTMPDao';
import deleteUserFromTMPDao from '../../db/user/deleteUserFromTMPDao';
let cancelCreateService = async (creator: any , _id :String)=>{
    // check if employ is exist 
    let params = {
        created_by : creator.id,
        _id : _id 
    }
    let userResp = await findUserTMPDao(params);

    if(userResp.resultMessage.status !== Status.SUCCESS){
        return error404('User Not Found')
    }

    // delete  from tmp 
    let deleteResp = await deleteUserFromTMPDao(params);

    return deleteResp;
}

export default cancelCreateService;
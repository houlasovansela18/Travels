import error403 from "../../utils/error403";
import confirmHardTokenDao from '../../db/employee/confirmHardTokenDao';
import Status from "../../utils/Status";

let confirmHardToken = async (param:any) =>{
    if(param.hardtoken.length !== 6){
        return error403('Invalid Request');
    }
    let confirmResp = await confirmHardTokenDao(param);
    if(confirmResp.resultMessage.status !== Status.SUCCESS){
        return error403('Invalid Request')
    }
    return confirmResp;
}

export default confirmHardToken;
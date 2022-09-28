import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import getBranchByUUID from '../../db/branch/getBranchByUUIDDao'; 
import editBranchDao from '../../db/branch/editBranchDao';
import FRole from '../../utils/FRole';
let editBranch = async (editor:any, _id :String, data:any)=>{

    // auth
    if(editor.role !== FRole.Partner){
        return errorUnauthorized('Unauthorized User')
    }
    // check branch
    let branchExistedResp = await getBranchByUUID(_id); 

    if(branchExistedResp.resultMessage.status !== Status.SUCCESS){
        return branchExistedResp
    }

    // check auth 
    if(editor._id !== branchExistedResp.data.created_by){
        return errorUnauthorized('Unauthorized User')
    }

    data.created_at = new Date();
    data._id = _id;
    let resp = await editBranchDao(data);
    return resp;
}

export default editBranch;
import getBranchByUUID from "../../db/branch/getBranchByUUIDDao";
import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import deleteBranchDao  from '../../db/branch/deleteBranchDao';
import FRole from '../../utils/FRole';
let deleteBranch = async (deletor :any, _id:String)=>{
    //auth 
    if(deletor.role !== FRole.Partner){
        return errorUnauthorized('Unauthorized User')
    }
    // check if branch is existed 
    let isExisted = await getBranchByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    // deletor
    if(deletor._id !== isExisted.data.created_by){
        return errorUnauthorized('Unauthorized User')
    }
    let resp = await deleteBranchDao(_id);
    return resp;
}

export default deleteBranch;
import IntStatus from "../../utils/IntStatus";
import createBranchDao from '../../db/branch/createBranchDao';
import FRole from '../../utils/FRole';
import errorUnauthorized from "../../utils/errorUnauthorized";
let createBranch = async (creator:any, data: any)=>{ 
    //auth
    if(creator.role !== FRole.Partner){
        return errorUnauthorized('Unauthorized User')
    }
    data.created_by = creator._id;
    data.created_at = new Date();
    data.status     = IntStatus.SUCCESS;
    let resp = await createBranchDao(data);
    return resp;
}

export default createBranch;
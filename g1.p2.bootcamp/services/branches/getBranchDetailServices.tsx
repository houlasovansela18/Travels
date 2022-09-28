import getBranchDetailDao from '../../db/branch/getBranchDetailDao';
let getBranchDetail =async (params:any)=>{
    let resp = await getBranchDetailDao(params);
    return resp;
}

export default getBranchDetail;
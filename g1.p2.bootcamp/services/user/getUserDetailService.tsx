import getUserDetailDao from '../../db/user/getUserDetailDao';
let getUserDetail = async (params:any)=>{
    let resp = await getUserDetailDao(params);
    return resp;
}

export default getUserDetail;
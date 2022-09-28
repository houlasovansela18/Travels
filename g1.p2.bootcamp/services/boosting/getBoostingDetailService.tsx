import getBoostingDetailDao from '../../db/boosting/getBoostingDetailDao';
let getBoostingDetail = async (params: any)=>{
    let resp = await getBoostingDetailDao(params);
    return resp;
}
export default getBoostingDetail;
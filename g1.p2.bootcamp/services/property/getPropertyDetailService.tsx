import getPropertyDetailDao from '../../db/properties/getPropertyDetailDao';
let getPropertyDetail = async (_id:String)=>{
    let resp = await getPropertyDetailDao(_id);

    return resp;
}

export default getPropertyDetail;
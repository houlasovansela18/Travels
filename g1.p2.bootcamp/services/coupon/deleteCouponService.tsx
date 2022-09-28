import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getCouponByUUIDDao from '../../db/coupon/getCouponByUUIDDao';
import deleteCouponDao from '../../db/coupon/deleteCouponDao';

let editBoosting = async (deletor:any, _id:String)=>{
    // check auth
    if(deletor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if it is existed
    let isExisted = await getCouponByUUIDDao(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }


   let resp = await deleteCouponDao(_id);

   return resp;
}

export default editBoosting;
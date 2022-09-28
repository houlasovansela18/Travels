import errorUnauthorized from '../../utils/errorUnauthorized';
import Status from '../../utils/Status';
import getCouponTMPUUIDDao from '../../db/coupon/getCouponTMPByUUIDDao';
import cancelCreateCouponDao from '../../db/coupon/cancelCreateCouponDao';

let cancelCreateCoupon = async (deletor:any, _id:String)=>{
    // check if item is existed
    let isExisted = await getCouponTMPUUIDDao(_id);

    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted
    }

    // check auth 
    if(deletor.id !== isExisted.data.created_by){
        return errorUnauthorized('Unauthorized User')
    }

    let resp = await cancelCreateCouponDao(_id);

    return resp;
}

export default cancelCreateCoupon;
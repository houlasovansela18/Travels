import Status from "../../utils/Status";
import getCouponUNAByUUID from "../../db/coupon/getCouponUNAByUUIDDao";
import deleteApprCouponDao from '../../db/coupon/deleteApprCouponDao';


let deleteApprCoupon = async (_id:String)=>{
    // check if it is existed
    let isExisted = await getCouponUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   let resp = await deleteApprCouponDao(_id);

   return resp;
}

export default deleteApprCoupon;
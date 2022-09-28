import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getCouponUNAByUUID from "../../db/coupon/getCouponUNAByUUIDDao";
import editApprCouponDao from '../../db/coupon/editApprCouponDao';

let editApprCoupon = async (editor:any, _id:String, data:any)=>{

    // check if it is existed
    let isExisted = await getCouponUNAByUUID(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   data.created_by = editor.id;
   data.created_at = new Date();
   data.status     = IntStatus.PENDING;
   data._id = _id;

   let resp = await editApprCouponDao(data.toJSON());

   return resp;
}

export default editApprCoupon;
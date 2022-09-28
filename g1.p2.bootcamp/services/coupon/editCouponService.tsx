import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import Role from "../../utils/Role";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getCouponByUUIDDao from '../../db/coupon/getCouponByUUIDDao';
import editCouponDao from '../../db/coupon/editCouponDao';

let editCoupon = async (editor:any, _id:String, data:any)=>{
    // check auth
    if(editor.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if it is existed
    let isExisted = await getCouponByUUIDDao(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

   data.created_by = editor.id;
   data.created_at = new Date();
   data.status     = IntStatus.PENDING;
   data._id = _id;

   let resp = await editCouponDao(data.toJSON());

   return resp;
}

export default editCoupon;
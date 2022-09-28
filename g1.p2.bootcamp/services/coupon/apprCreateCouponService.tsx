import error404 from "../../utils/error404";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import getCouponUNAByUUIDDao from '../../db/coupon/getCouponUNAByUUIDDao';
import apprCreateCouponDao from '../../db/coupon/apprCreateCouponDao';

let apprCreateCoupon = async (approver:any, _id:String)=>{
    // check auth 
    if(approver.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check if item is existed
    let isExisted = await getCouponUNAByUUIDDao(_id);

    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return error404('Data Not Found')
    }

    let data = isExisted.data.toJSON();
    data.modified_by = approver.id;
    data.modified_at = new Date();
    data.effective_date = new Date();
    data.status = IntStatus.SUCCESS;

    let resp = await apprCreateCouponDao(data);

    return resp;
}

export default apprCreateCoupon;
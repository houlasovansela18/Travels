import errorUnauthorized from "../../utils/errorUnauthorized";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import getCouponTMPByUUIDDao from '../../db/coupon/getCouponTMPByUUIDDao';
import confirmCreateCouponDao from '../../db/coupon/confirmCreateCouponDao';

let confirmCreateCoupon = async (approver:any , _id:String)=>{

    // if authorized
    if(approver.role === Role.Normal){
        return errorUnauthorized('Unauthorized User')
    }
    // check item is existed
    let isExist = await getCouponTMPByUUIDDao(_id);
    if(isExist.resultMessage.status !== Status.SUCCESS){
        return isExist;
    }
    
    // confirmCreate
    let data = isExist.data.toJSON();
    data.created_at = new Date();
    let resp = await confirmCreateCouponDao(data);

    return resp;
}

export default confirmCreateCoupon;
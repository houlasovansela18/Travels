import generateCouponCode from '../../utils/generateCouponCode';
import IntStatus from '../../utils/IntStatus';
import Status from '../../utils/Status';
import findCouponByCodeDao from '../../db/coupon/findCouponByCodeDao';
import findCouponUNAByCodeDao from '../../db/coupon/findCouponUNAByCodeDao';
import createCouponDao from '../../db/coupon/createCouponDao';

let createCoupon = async (creator:any, data:any)=>{
    // generate coupon code 
    let code = generateCouponCode();
    //check if coupon is already existed
    let isExistedInMain = await findCouponByCodeDao(code);
    let isExistedInUNA  = await findCouponUNAByCodeDao(code);
    if(isExistedInMain.resultMessage.status === Status.SUCCESS || isExistedInUNA.resultMessage.status === Status.SUCCESS){
        return {
            resultMessage : {
                status : Status.ERROR,
                statusCode : 500,
                errorMessage : 'Please Try again',
                message : 'Error' 
            },
            data : null
        };
    }
    
    data.created_by = creator.id;
    data.created_at = new Date();
    data.code       = code;
    data.status     = IntStatus.PENDING;

    let resp = createCouponDao(data.toJSON());
    return resp;
}

export default createCoupon;
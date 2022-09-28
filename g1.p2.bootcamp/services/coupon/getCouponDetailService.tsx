import getCouponDetailDao from '../../db/coupon/getCouponDetailDao';
let getCouponDetail = async (params:any)=>{
    let resp = await getCouponDetailDao(params);

    return resp;
}

export default getCouponDetail;
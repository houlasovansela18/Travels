
import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../../middleware/auth/initAuth';
import handler from '../../../../../../middleware/handler';
import error403 from '../../../../../../utils/error403';
import rejectApprCouponService from '../../../../../../services/coupon/rejectApprCouponService';

handler 
.use(initAuth)
.patch(async ( req:NextApiRequest, res:NextApiResponse)=>{
    let _id  = req.query._id;
    let rejector = req.user;
    let reject_reason = req.body;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }

    let resp = await rejectApprCouponService(rejector, _id, reject_reason);

    return res.status(resp.resultMessage.statusCode).send(resp)

})
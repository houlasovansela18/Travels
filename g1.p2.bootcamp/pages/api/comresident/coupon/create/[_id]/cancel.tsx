import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../../middleware/auth/initAuth';
import handler from '../../../../../../middleware/handler';
import error403 from '../../../../../../utils/error403';
import cancelCreateCouponService from '../../../../../../services/coupon/cancelCreateCouponService';

handler
.use(initAuth)
.delete(async (req:NextApiRequest, res : NextApiResponse)=>{
    let deletor = req.user;
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err = error403("Invalid Request")
        return res.status(err.resultMessage.statusCode).send(err)
    }

    let resp = await cancelCreateCouponService(deletor, _id);

    return res.status(resp.resultMessage.statusCode).send(resp)
})
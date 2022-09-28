import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import editApprCouponService from '../../../../../services/coupon/editApprCouponService';

handler
.use(initAuth)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let editor = req.user;
    let data = req.body;

    let resp = await editApprCouponService(editor, _id, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }

    let resp = await deleteApprCouponService( _id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
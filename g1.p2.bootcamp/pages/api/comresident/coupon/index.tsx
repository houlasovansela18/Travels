import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../middleware/auth/initAuth';
import handler from '../../../../middleware/handler';
import getCouponListService from '../../../../services/coupon/getCouponListService';

handler
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let pages = req.query.pages;
    let limit = req.query.limit;
    let status = req.query.status;
    let search = req.body;

    let params = {
        pages : pages,
        limit : limit,
        search : search,
        status : status
    }

    let resp = await getCouponListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp)
})
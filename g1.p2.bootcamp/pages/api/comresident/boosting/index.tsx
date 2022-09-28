import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../middleware/auth/initAuth';
import handler from '../../../../middleware/handler';
import getBoostingListService from '../../../../services/boosting/getBoostingListService';
handler
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let page   = req.query.page;
    let limit  = req.query.limit;
    let status = req.query.status;
    let search  = req.body;
    let params = {
        page : page,
        limit : limit,
        status : status,
        search  : search
    }
    
    let resp = await getBoostingListService(params);

    return res.status(resp.resultMessage.statusCode).send(resp);
})
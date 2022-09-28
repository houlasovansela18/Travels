import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import getBranchListService from '../../../../../services/branches/getBranchListService';
handler 
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let page = req.query.page;
    let limit = req.query.limit;
    let search = req.body;
    let params = {
        page : page,
        limit : limit,
        search : search
    }

    let resp = await getBranchListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
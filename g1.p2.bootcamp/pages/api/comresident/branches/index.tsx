import { NextApiRequest, NextApiResponse } from 'next';
import authUser from '../../../../middleware/auth/authUser';
import handler from '../../../../middleware/handler';
import createBranch from  '../../../../services/branches/createBranchService';
import getBranchListService from '../../../../services/branches/getBranchListService';
handler
.use(authUser)
.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creator = req.user;
    let data = req.body;

    let resp = await createBranch(creator, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let page = req.query.page;
    let limit = req.query.limit;
    let search = req.body;
    let params ={
        page : page,
        limit : limit,
        search : search
    }

    let resp = await getBranchListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
export default handler;
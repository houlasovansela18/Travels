import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../middleware/auth/initAuth';
import handler from '../../../../middleware/handler';
import getEmployeeListService  from '../../../../services/employee/getEmployeeListService';
handler 
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let currentUser = req.user;
    let page = req.query.page;
    let limit = req.query.limit;
    let search = req.body;
    let status = req.query.status;
    let params = {
        currentUser : currentUser,
        page : page,
        limit : limit,
        search : search,
        status  : status
    }

    let resp = await getEmployeeListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
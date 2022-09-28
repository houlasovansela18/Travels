import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import  handler from '../../../../../middleware/handler';
import createdEmpEduService from '../../../../../services/employeeInfo/education/createdEmpEduService';
import getEducationListService from '../../../../../services/employeeInfo/education/getEducationListService';
handler
.use(initAuth)
.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creator = req.user;
    let data    = req.body;
    
    let resp = await  createdEmpEduService(creator, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let page = req.query.page;
    let limit = req.query.limit;
    let search = req.body;
    let status = req.query.status;
    let params = {
        page : page,
        limit : limit,
        search : search,
        status  : status
    }

    let resp = await getEducationListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
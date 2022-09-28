import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import  handler from '../../../../../middleware/handler';
import createdEmpAddService from '../../../../../services/employeeInfo/address/createdEmpAddService';
import getAddressListService from '../../../../../services/employeeInfo/address/getAddressListService';
handler
.use(initAuth)
.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creator = req.user;
    let data    = req.body;
    
    let resp = await  createdEmpAddService(creator, data);
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

    let resp = await getAddressListService(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
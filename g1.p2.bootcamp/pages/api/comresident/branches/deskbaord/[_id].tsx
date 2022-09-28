import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import getBranchDetailServices from '../../../../../services/branches/getBranchDetailServices';

handler
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse) =>{
    let _id = req.query._id;
    let status = req.query.status;
    if(typeof(_id) !== 'string' || typeof(status) !== 'string'){
        let err = error403("Invalid Request")
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let params = {
        _id : _id,
        status : status
    }
    let resp = await getBranchDetailServices(params);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;

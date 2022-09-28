import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import getPropertyDetailService from '../../../../../services/property/getPropertyDetailService';

handler
.use(initAuth)
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err = error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await getPropertyDetailService(_id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
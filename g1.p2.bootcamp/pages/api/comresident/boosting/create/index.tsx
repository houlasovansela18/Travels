import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import createBoosting from '../../../../../services/boosting/createBoostingService';

handler
.use(initAuth)
.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creator = req.user;
    let data = req.body;

    let resp = await createBoosting(creator, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
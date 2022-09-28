
import { NextApiRequest, NextApiResponse } from 'next';
import authUser from '../../../../middleware/auth/authUser';
import handler from '../../../../middleware/handler';
import reportService from '../../../../services/reporting/reportService';

handler
.use(authUser)
.post(async ( req:NextApiRequest, res:NextApiResponse) => {
    let reporter = req.user;
    let data = req.body;

    let resp = await reportService(reporter, data);

    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
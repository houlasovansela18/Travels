
import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import logOut from '../../../../../services/employee/logOut';
handler
.use(initAuth)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let user = req.user;
    console.log(user)
    const resp = await logOut(user);

    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
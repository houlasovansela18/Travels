import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../../middleware/auth/initAuth";
import handler from '../../../../../../middleware/handler';
import createUserService from '../../../../../../services/user/createUserService';
handler
.use(initAuth)
.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creater  = req.user;
    let userData = req.body;

    const resp = await createUserService(creater, userData);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;


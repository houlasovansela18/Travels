import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../../../middleware/auth/initAuth";
import handler from '../../../../../../../middleware/handler';
import error403 from "../../../../../../../utils/error403";
import cancelCreateUserService from '../../../../../../../services/user/cancelCreateUserService';
handler
.use(initAuth)
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let creator = req.user;
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let invalidReqErr = error403('Invalid Request')
        return res.status(invalidReqErr.resultMessage.statusCode).send(invalidReqErr)
    }
    
    const resp = await cancelCreateUserService(creator, _id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})


export default handler;
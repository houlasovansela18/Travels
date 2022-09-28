import { NextApiRequest, NextApiResponse } from "next";
import confirmHardTokenService from  '../../../../../../services/employee/confirmHardTokenService';
let confirm = async (req: NextApiRequest, res:NextApiResponse) =>{
    let userId = req.query._id;
    let hardToken = req.body.hardtoken;
    let param = {
        _id      : userId,
        hardtoken: hardToken
    }
    let resp = await confirmHardTokenService(param);
    return res.status(resp.resultMessage.statusCode).send(resp);
}

export default confirm;
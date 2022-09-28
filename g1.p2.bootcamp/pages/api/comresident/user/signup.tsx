import { NextApiRequest, NextApiResponse } from "next";
import signUpService from '../../../../services/user/signUpService';
let signUp  = async (req:NextApiRequest, res:NextApiResponse)=>{
    let data  = req.body;
    let resp = await signUpService(data);
    return res.status(resp.resultMessage.statusCode).send(resp)
}

export default signUp;
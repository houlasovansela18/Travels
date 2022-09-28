import { NextApiRequest, NextApiResponse } from "next";
import loginService from '../../../../../services/employee/loginService';
let Login = async (req:NextApiRequest, res: NextApiResponse)=>{
    let user = req.body;
    let resp = await loginService(user);
    return res.status(resp.resultMessage.statusCode).send(resp);
}

export default Login;
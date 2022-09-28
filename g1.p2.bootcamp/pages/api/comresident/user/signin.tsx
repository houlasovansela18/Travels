import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import signInService from '../../../../services/user/signInService';
import Status from "../../../../utils/Status";

let SignIn = async (req:NextApiRequest, res:NextApiResponse)=>{
    let data = req.body;
    let resp = await signInService(data);
    if(resp.resultMessage.status !== Status.SUCCESS){
        return res.redirect("/");
    }
    
    setCookie('authuser', resp.data, {req, res, maxAge: 60 * 6 * 24*30})
    return res.redirect("/");
}

export default SignIn;
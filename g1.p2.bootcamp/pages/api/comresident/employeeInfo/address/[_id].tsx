import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import  handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import editEmpAddService from '../../../../../services/employeeInfo/address/editEmpAddService';
import deleteEmpAddService from '../../../../../services/employeeInfo/address/deleteEmpAddService';
import getEmpAddDetailService from '../../../../../services/employeeInfo/address/getEmpAddDetailService';

handler
.use(initAuth)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let editor = req.user;
    let data    = req.body;
    let userId =  req.query._id;
    if(typeof(userId) !== 'string'){
        let err = error403('Invalid Request');
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await  editEmpAddService(editor, userId, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse) =>{
    let editor = req.user;
    let userId =  req.query._id;
    if(typeof(userId) !== 'string'){
        let err = error403('Invalid Request');
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await  deleteEmpAddService(editor, userId);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req : NextApiRequest, res:NextApiResponse)=>{
    let _id  = req.query._id;
    if(typeof(_id) !== 'string'){
        let err = error403('Invalid Request');
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await getEmpAddDetailService(_id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
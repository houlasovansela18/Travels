import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import  handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import editEmpEduService from '../../../../../services/employeeInfo/education/editEmpEduService';
import deleteEmpEduService from '../../../../../services/employeeInfo/education/deleteEmpEduService';
import getEmpEduDetailService from '../../../../../services/employeeInfo/education/getEmpEduDetailService';

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
    let resp = await  editEmpEduService(editor, userId, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse) =>{
    let editor = req.user;
    let userId =  req.query._id;
    if(typeof(userId) !== 'string'){
        let err = error403('Invalid Request');
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await  deleteEmpEduService(editor, userId);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id ;
    if(typeof(_id) !== 'string'){
        let err = error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }

    let resp = await getEmpEduDetailService(_id);
    return res.status(resp.resultMessage.statusCode).send(resp)
})

export default handler;
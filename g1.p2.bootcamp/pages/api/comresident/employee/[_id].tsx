import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../middleware/auth/initAuth';
import handler from '../../../../middleware/handler';
import error403 from '../../../../utils/error403';
import editEmployeeService from '../../../../services/employee/editEmployeeService';
import deleteEmployeeService  from '../../../../services/employee/deleteEmployeeService';
import getEmployeeDetailService from '../../../../services/employee/getEmployeeDetailService';

handler
.use(initAuth)
.patch(async (req:NextApiRequest,res:NextApiResponse)=>{
        let editor = req.user;
        let _id = req.query._id;
        let data = req.body;
        if(typeof(_id) !== 'string'){
                let error = error403('Invalid Request')
                return res.status(error.resultMessage.statusCode).send(error)
        }

        const resp = await editEmployeeService(editor, _id, data);

        return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
        let editor = req.user;
        let _id = req.query._id;
        if(typeof(_id) !== 'string'){
                let error = error403('Invalid Request')
                return res.status(error.resultMessage.statusCode).send(error)
        }

        const resp = await deleteEmployeeService(editor, _id);

        return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
        let _id  = req.query._id;
        let status = req.query.status ;
        if(typeof(_id) !== 'string' || typeof(status) !== 'string'){
                let err = error403("Invalid Request")
        }
        let params = {
                _id : _id,
                status : status
        }
        let resp = await getEmployeeDetailService(params);
        return res.status(resp.resultMessage.statusCode).send(resp);
{

}})

export default handler;
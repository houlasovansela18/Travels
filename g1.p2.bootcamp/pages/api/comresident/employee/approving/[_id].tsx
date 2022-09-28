
import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../middleware/auth/initAuth';
import handler from '../../../../../middleware/handler';
import error403 from '../../../../../utils/error403';
import editEmployeeUNAService from '../../../../../services/employee/editEmployeeUNAService';
import deleteEmployeeUNAService from '../../../../../services/employee/deleteEmployeeUNAService';

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

        const resp = await editEmployeeUNAService(editor, _id, data);

        return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
        let editor = req.user;
        let _id = req.query._id;
        if(typeof(_id) !== 'string'){
                let error = error403('Invalid Request')
                return res.status(error.resultMessage.statusCode).send(error)
        }

        const resp = await deleteEmployeeUNAService(editor, _id);

        return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;

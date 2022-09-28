
import { NextApiRequest, NextApiResponse } from 'next';
import authUser from '../../../../middleware/auth/authUser';
import handler from '../../../../middleware/handler';
import error403 from '../../../../utils/error403';
import editReportService from '../../../../services/reporting/editReportService';
import deleteReportService from '../../../../services/reporting/deleteReportService';

handler
.use(authUser)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        return error403('Invalid Request')
    }
    let editor = req.use;
    let data = req.body;

    let resp = await editReportService(editor, _id, data);
    
    return res.status(resp.resultMessage.statusCode).send(resp)
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        return error403('Invalid Request')
    }
    let editor = req.use;

    let resp = await deleteReportService(editor, _id);
    
    return res.status(resp.resultMessage.statusCode).send(resp)
});
export default handler;
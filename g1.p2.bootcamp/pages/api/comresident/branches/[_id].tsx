import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../../../middleware/handler';
import error403 from '../../../../utils/error403';
import authUser from '../../../../middleware/auth/authUser';
import editBranchService from '../../../../services/branches/editBranchService';
import deleteBranchService from '../../../../services/branches/deleteBranchService';
import getBranchDetail from '../../../../db/branch/getBranchDetailDao';

handler
.use(authUser)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let editor = req.user;
    let data = req.body;

    let resp = await editBranchService(editor, _id, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let deletor = req.user;
    let resp = await deleteBranchService(deletor, _id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    let status  = req.query.status;
    if(typeof(_id) !== 'string' || typeof(status) !== 'string'){
        let err = error403('Invalid Request')
    }
    let params = {
        _id : _id,
        status : status
    }
    let resp = await getBranchDetail(params)
    
    return res.status(resp.resultMessage.statusCode).send(resp)
})

export default handler;
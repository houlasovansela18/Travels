import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../../../middleware/handler';
import error403 from '../../../../utils/error403';
import authUser from '../../../../middleware/auth/authUser';
import editPropertyService from '../../../../services/property/editPropertyService';
import deletePropertyService from '../../../../services/property/deletePropertyService';
import getPropertyDetail from '../../../../services/property/getPropertyDetailService';

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

    let resp = await editPropertyService(editor, _id, data);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err =  error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let deletor = req.user;
    let resp = await deletePropertyService(deletor, _id);
    return res.status(resp.resultMessage.statusCode).send(resp);
})
.get(async (req : NextApiRequest,  res: NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
        let err = error403('Invalid Request')
        return res.status(err.resultMessage.statusCode).send(err)
    }
    let resp = await getPropertyDetail(_id);
    return res.status(resp.resultMessage.statusCode).send(resp);
    
});

export default handler;
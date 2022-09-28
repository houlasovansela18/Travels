
import { NextApiRequest, NextApiResponse } from 'next';
import authUser from '../../../../middleware/auth/authUser';
import handler from '../../../../middleware/handler';
import error403 from '../../../../utils/error403';
import editRatingService from '../../../../services/rating/editRatingService';
import deleteRatingService from '../../../../services/rating/deleteRatingService';

handler
.use(authUser)
.patch(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
       let err = error403('Invalid Request');
       return res.status(err.resultMessage.statusCode).send(err)
    }

    let rater = req.user;
    let data = req.body;

    const resp = await editRatingService(rater, _id, data);

    return res.status(resp.resultMessage.statusCode).send(resp)

})
.delete(async (req:NextApiRequest, res:NextApiResponse)=>{
    let _id = req.query._id;
    if(typeof(_id) !== 'string'){
       let err = error403('Invalid Request');
       return res.status(err.resultMessage.statusCode).send(err)
    }

    let deletor = req.user;

    const resp = await deleteRatingService(deletor, _id);

    return res.status(resp.resultMessage.statusCode).send(resp)
})

export default handler;


import { NextApiRequest, NextApiResponse } from 'next';
import authUser from '../../../../middleware/auth/authUser';
import handler from '../../../../middleware/handler';
import ratingService from '../../../../services/rating/ratingService';
handler
.use(authUser)
.post(async (req: NextApiRequest , res :NextApiResponse)=>{
    let data = req.body;
    let rater = req.user;
    let resp = await ratingService(rater, data);
    
    return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
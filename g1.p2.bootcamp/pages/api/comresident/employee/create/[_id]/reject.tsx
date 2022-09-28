import { NextApiRequest, NextApiResponse } from 'next';
import initAuth from '../../../../../../middleware/auth/initAuth';
import handler from '../../../../../../middleware/handler';
import rejectCreatingService from '../../../../../../services/employee/rejectCreatingService';
import error403 from '../../../../../../utils/error403';
handler
.use(initAuth)
.patch(async (req:NextApiRequest, res:NextApiResponse) =>{

      let _id = req.query._id;
      let modifier = req.user;
      let rejectReason = req.body.reject_reason;
      if(typeof(_id) !== 'string'){
        let error = error403('Invalid Request')
        return res.status(error.resultMessage.statusCode).send(error);
      }
      let resp = await rejectCreatingService(modifier, _id, rejectReason);
      return res.status(resp.resultMessage.statusCode).send(resp);
})

export default handler;
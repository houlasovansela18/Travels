import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../../middleware/auth/initAuth";
import handler from "../../../../../../middleware/handler";
import confirmCreateService from '../../../../../../services/employee/confirmCreateService'
import error403 from "../../../../../../utils/error403";

handler
.use(initAuth)
.post(async (req: NextApiRequest, res:NextApiResponse)=>{
      const creator = req.user;
      const _id = req.query._id;
      if(typeof(_id) !== 'string'){
        let invalidReqErr = error403('')
        return res.status(invalidReqErr.resultMessage.statusCode).send(invalidReqErr)
      }

      let resp = await confirmCreateService(creator, _id);

      return res.status(resp.resultMessage.statusCode).send(resp);
      
})

export default handler;
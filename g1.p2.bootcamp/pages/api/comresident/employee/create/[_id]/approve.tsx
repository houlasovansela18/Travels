import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../../middleware/auth/initAuth";
import handler from "../../../../../../middleware/handler";
import approveCreating  from '../../../../../../services/employee/approveCreating';
import error403 from "../../../../../../utils/error403";
handler
.use(initAuth)
.post(async (req: NextApiRequest, res:NextApiResponse)=>{
      const modifier = req.user;
      const _id = req.query._id;
      if(typeof(_id) !== 'string'){
            let err = error403('')
            return res.status(err.resultMessage.statusCode).send(err);
      }
      let resp = await approveCreating(modifier, _id);

      return res.status(resp.resultMessage.statusCode).send(resp);

})

export default handler;
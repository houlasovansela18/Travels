import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../../middleware/auth/initAuth";
import handler from "../../../../../../middleware/handler";
import error403 from "../../../../../../utils/error403";
import editApprUserService from "../../../../../../services/user/editApprUserService";
import deleteApprUserService from "../../../../../../services/user/deleteApprUserService";

handler
	.use(initAuth)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let editor = req.user;
		let _id = req.query._id;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}

		let data = req.body;

		let resp = await editApprUserService(editor, _id, data);
        
		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		let deletor = req.user;
		let _id = req.query._id;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}

		let resp = await deleteApprUserService(deletor, _id);

		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

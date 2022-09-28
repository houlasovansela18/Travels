import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../middleware/auth/initAuth";
import handler from "../../../../middleware/handler";
import error403 from "../../../../utils/error403";
import editUserService from "../../../../services/user/editUserService";
import deleteUserService from "../../../../services/user/deleteUserService";
import getUserDetail from "../../../../services/user/getUserDetailService";

handler
	.use(initAuth)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let editor = req.user;
		let _id = req.query._id;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}

		let data = req.body;

		let resp = await editUserService(editor, _id, data);

		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		let deletor = req.user;
		let _id = req.query._id;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}

		let resp = await deleteUserService(deletor, _id);

		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		let _id = req.query._id;
		let status = req.query.status;
		if (typeof _id !== "string" || typeof status !== "string") {
			let err = error403("Invalid Request");
			return res.status(err.resultMessage.statusCode).send(err);
		}
		let params = {
			_id: _id,
			status: status,
		};
		let resp = await getUserDetail(params);
		return res.status(resp.resultMessage.statusCode).send(resp);
	});
export default handler;

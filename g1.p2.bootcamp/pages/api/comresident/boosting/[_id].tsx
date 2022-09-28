import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../middleware/auth/initAuth";
import handler from "../../../../middleware/handler";
import error403 from "../../../../utils/error403";
import editBoostingService from "../../../../services/boosting/editBoostingService";
import deleteBoostingService from "../../../../services/boosting/deleteBoostingService";
import getBoostingDetailService from "../../../../services/boosting/getBoostingDetailService";

handler
	.use(initAuth)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let _id = req.query._id;
		if (typeof _id !== "string") {
			let err = error403("Invalid Request");
			return res.status(err.resultMessage.statusCode).send(err);
		}
		let editor = req.user;
		let data = req.body;

		let resp = await editBoostingService(editor, _id, data);
		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		let _id = req.query._id;
		if (typeof _id !== "string") {
			let err = error403("Invalid Request");
			return res.status(err.resultMessage.statusCode).send(err);
		}
		let deletor = req.user;
		let resp = await deleteBoostingService(deletor, _id);
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

		let resp = await getBoostingDetailService(params);
		return res.status(resp.resultMessage.statusCode).send(resp);
	});

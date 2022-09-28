import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../middleware/auth/authUser";
import handler from "../../../../middleware/handler";
import error403 from "../../../../utils/error403";
import editReviewService from "../../../../services/review/editReviewService";
import deleteReviewService from "../../../../services/review/deleteReviewService";
handler
	.use(authUser)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let _id = req.query._id;
		if (typeof _id !== "string") {
			let err = error403("Invalid Request");
			return res.status(err.resultMessage.statusCode).send(err);
		}

		let editor = req.user;
		let data = req.body;

		const resp = await editReviewService(editor, _id, data);

		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		let _id = req.query._id;
		if (typeof _id !== "string") {
			let err = error403("Invalid Request");
			return res.status(err.resultMessage.statusCode).send(err);
		}

		let deletor = req.user;

		const resp = await deleteReviewService(deletor, _id);

		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

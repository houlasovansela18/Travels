import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../middleware/auth/initAuth";
import handler from "../../../../../middleware/handler";
import error403 from "../../../../../utils/error403";
import rejectApprPartnership from "../../../../../services/user/rejectApprPartnership";
import userApprPartnershipService from "../../../../../services/user/userApprPartnershipService";
import Status from "../../../../../utils/Status";
import { deleteCookie } from "cookies-next";
handler
	.use(initAuth)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let modifier = req.user;
		let _id = req.query._id;
		let reject_reason = req.body.reject_reason;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}
		let resp = await rejectApprPartnership(modifier, _id, reject_reason);
		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let modifier = req.user;
		let _id = req.query._id;
		if (typeof _id !== "string") {
			return error403("Invalid Request");
		}
		let resp = await userApprPartnershipService(modifier, _id);
		if (resp.resultMessage.status === Status.SUCCESS)
			deleteCookie("pending", { req, res });
		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

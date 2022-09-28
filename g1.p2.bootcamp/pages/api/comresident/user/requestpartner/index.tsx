import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../../middleware/auth/authUser";
import handler from "../../../../../middleware/handler";
import requestPartnershipService from "../../../../../services/user/requestPartnershipService";
import cancelReqUserPartner from "../../../../../services/user/canReqPartnershipService";
import { setCookie } from "cookies-next";

handler
	.use(authUser)
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let user = req.user;
		let resp = await requestPartnershipService(user);
		setCookie("authuser", resp.data, { req, res });
		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		let cancelor = req.user;
		let resp = await cancelReqUserPartner(cancelor);
		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

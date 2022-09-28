import { NextApiRequest, NextApiResponse } from "next";
import initAuth from "../../../../../middleware/auth/initAuth";
import handler from "../../../../../middleware/handler";
import createCouponService from "../../../../../services/coupon/createCouponService";
handler
	.use(initAuth)
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let creator = req.user;
		let data = req.body;

		let resp = await createCouponService(creator, data);
		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

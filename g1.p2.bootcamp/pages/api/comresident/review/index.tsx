import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../middleware/auth/authUser";
import handler from "../../../../middleware/handler";
import reviewService from "../../../../services/review/reviewService";
handler
	.use(authUser)
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let data = req.body;
		let cmtor = req.user;
		let resp = await reviewService(cmtor, data);

		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../middleware/auth/authUser";
import handler from "../../../../middleware/handler";
import likingService from "../../../../services/like/likingService";
import getLikingService from "../../../../services/like/getLikingService";

handler
	.use(authUser)
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let liker = req.user;
		let _id = req.query._id;
		let params = {
			liker: liker,
			_id: _id,
		};
		let resp = await likingService(params);

		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		let liker = req.user;
		let _id = req.query._id;
		let params = {
			liker: liker,
			_id: _id,
		};
		let resp = await getLikingService(params);

		return res.status(resp.resultMessage.statusCode).send(resp);
	});
export default handler;

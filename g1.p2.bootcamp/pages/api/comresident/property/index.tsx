import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../middleware/auth/authUser";
import handler from "../../../../middleware/handler";
import createPropertyService from "../../../../services/property/createPropertyService";
import getAllPropertyService from "../../../../services/property/getAllPropertyService";
handler
	.use(authUser)
	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		let creator = req.user;
		let data = req.body;

		let resp = await createPropertyService(creator, data);
		return res.status(resp.resultMessage.statusCode).send(resp);
	})
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		let search = req.query.search;
		let filter = req.query.filter;
		let params = {
			search: search,
			filter: filter,
		};
		let resp = await getAllPropertyService(params);
		return res.status(resp.resultMessage.statusCode).send(resp);
	});

export default handler;

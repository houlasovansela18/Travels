import { NextApiRequest, NextApiResponse } from "next";

let getReview = async (req: NextApiRequest, res: NextApiResponse) => {
	let _id = req.query._id;
	let page = req.query.page;
	let limit = req.query.limit;
	let params = {
		page: page,
		limit: limit,
		_id: _id,
	};
	let resp = await getCommentsListService(params);
	return res.status(resp.resultMessage.statusCode).send(resp);
};

export default getReview;

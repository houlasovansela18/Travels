import { NextApiRequest, NextApiResponse } from "next";
import getAllPropertyService from "../../../../../services/property/getAllPropertyService";
let getAllProperty = async (req: NextApiRequest, res: NextApiResponse) => {
	let search = req.query.search;
	let filter = req.query.filter;
	let params = {
		search: search,
		filter: filter,
	};
	let resp = await getAllPropertyService(params);
	return res.status(resp.resultMessage.statusCode).send(resp);
};

export default getAllProperty;

import error403 from "../../utils/error403";
import getBoostingListDao from "../../db/boosting/getBoostingListDao";
let getBoostingList = async (params: any) => {
	try {
		//check page and limit
		let getPage;
		let getLimit;
		let status;
		!params.page ? (getPage = 1) : (getPage = parseInt(params.page));
		!params.limit ? (getLimit = 10) : (getLimit = parseInt(params.limit));
		!params.status ? (status = 10) : (status = parseInt(params.status));
		!params.search
			? (params.search = "")
			: (params.search = params.search.toString());
		let skip = (getPage - 1) * getLimit;

		let resp = await getBoostingListDao(skip, getLimit, status, params.search);

		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getBoostingList;

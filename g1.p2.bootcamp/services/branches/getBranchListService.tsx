import error403 from "../../utils/error403";
import getBranchListDao from "../../db/branch/getBranchListDao";
let getBranchList = async (params: any) => {
	try {
		// re structure the data
		let limit = !params.limit ? 10 : parseInt(params.limit);

		let preData = {
			limit: limit,
			skip: !params.page ? 0 : (parseInt(params.page) - 1) * limit,
			search: !params.search ? "" : params.search.toString(),
		};
		let resp = await getBranchListDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getBranchList;

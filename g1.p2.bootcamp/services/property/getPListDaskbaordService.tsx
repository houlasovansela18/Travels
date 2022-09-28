import error403 from "../../utils/error403";
import getPListDaskbaordDao from "../../db/properties/getPListDaskbaordDao";

let getPListDaskbaord = async (params: any) => {
	try {
		// re structure the data
		let limit = !params.limit ? 10 : parseInt(params.limit);

		let preData = {
			limit: limit,
			skip: !params.page ? 0 : (parseInt(params.page) - 1) * limit,
			search: !params.search ? "" : params.search.toString(),
		};
		let resp = await getPListDaskbaordDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getPListDaskbaord;

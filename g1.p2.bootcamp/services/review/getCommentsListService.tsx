import error403 from "../../utils/error403";
import getCommentListDao from "../../db/review/getCommentListDao";
let getEducationList = async (params: any) => {
	try {
		// re structure the data
		let limit = !params.limit ? 10 : parseInt(params.limit);

		let preData = {
			_id: params._id,
			limit: limit,
			skip: !params.page ? 0 : (parseInt(params.page) - 1) * limit,
		};
		let resp = await getCommentListDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getEducationList;

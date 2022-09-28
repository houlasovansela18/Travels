import error403 from "../../utils/error403";
import IntStatus from "../../utils/IntStatus";
import getCouponListDao from "../../db/coupon/getCouponListDao";
let getCouponList = async (params: any) => {
	try {
		let limit = !params.limit ? 10 : parseInt(params.limit);

		let preData = {
			limit: limit,
			skip: !params.pages ? 0 : (parseInt(params.pages) - 1) * limit,
			search: !params.search ? "" : params.search.toString(),
			status: !params.status ? IntStatus.SUCCESS : parseInt(params.status),
		};
		let resp = await getCouponListDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getCouponList;

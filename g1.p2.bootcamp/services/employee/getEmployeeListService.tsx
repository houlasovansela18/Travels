import IntStatus from "../../utils/IntStatus";
import getEmployeeListDao from "../../db/employee/getEmployeeListDao";
import error403 from "../../utils/error403";

let getEmployeeList = async (params: any) => {
	try {
		// re structure the data
		let limit = !params.limit ? 10 : parseInt(params.limit);

		let preData = {
			limit: limit,
			skip: !params.page ? 0 : (parseInt(params.page) - 1) * limit,
			search: !params.search ? "" : params.search.toString(),
			status: !params.status ? IntStatus.SUCCESS : parseInt(params.status),
			userRole: params.currentUser.role,
		};
		let resp = await getEmployeeListDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getEmployeeList;

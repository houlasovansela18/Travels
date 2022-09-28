import error403 from "../../utils/error403";
import getAllPropertyDao from "../../db/properties/getAllPropertyDao";

let getAllProperty = async (params: any) => {
	try {
		let preData = {
			search: (params.search || "").toString(),
			filter: (params.filter || "").toString(),
		};
		let resp = await getAllPropertyDao(preData);
		return resp;
	} catch (e) {
		return error403("Invalid Request");
	}
};

export default getAllProperty;

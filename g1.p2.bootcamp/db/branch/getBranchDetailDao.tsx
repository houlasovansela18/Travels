import connect from "../../config/db";
import Branch from "../../model/frontend/properties/branch";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getBranchDetail = async (params: any) => {
	try {
		await connect();
		let resp = await Branch.findOne(params);
		if (!resp) {
			return error404("Branch Not Found");
		}
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: {
				profile_url: resp.profile_url,
				cover: resp.cover,
				category: resp.category,
				title: resp.title,
				subtitle: resp.subtitle,
				description: resp.description,
				p_lat: resp.p_lat,
				p_long: resp.p_long,
				zone: resp.zone,
				created_by: resp.created_by,
			},
		};
	} catch (e) {
		return error501("Internal Server Error");
	}
};

export default getBranchDetail;

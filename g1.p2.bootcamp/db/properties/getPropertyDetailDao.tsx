import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getPropertyDetail = async (_id: String) => {
	try {
		await connect();
		let resp = await Property.findOne({ _id: _id });
		if (!resp) {
			return error404("Property Not Found");
		}
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: {
				...resp._doc,
			},
		};
	} catch (e) {
		return error501("Internal Server Error");
	}
};

export default getPropertyDetail;

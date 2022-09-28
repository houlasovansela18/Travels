import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let pushToProperty = async (params: any) => {
	try {
		await connect();
		let resp = await Property.findOneAndUpdate(
			{ _id: params.prop_id },
			{ $push: { like: params.liker_id } }
		);
		if (resp) {
			return error404("Data Not Found");
		}
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: null,
		};
	} catch (e) {
		return error501("Internal Server Errror");
	}
};

export default pushToProperty;

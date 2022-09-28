import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getPListDashBaord = async (params: any) => {
	try {
		await connect();
		let resp;
		params.search.lenght === 0
			? (resp = await Property.find().skip(params.skip).limit(params.limit))
			: (resp = await Property.find({
					$or: [
						{ category: { $regex: params.search, $options: "i" } },
						{ title: { $regex: params.search, $options: "i" } },
						{ subtitle: { $regex: params.search, $options: "i" } },
						{ created_by: { $regex: params.search, $options: "i" } },
					],
			  })
					.skip(params.skip)
					.limit(params.limit));

		if (!resp) {
			return error404("Data Not Found");
		}
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: resp,
		};
	} catch (e) {
		return error501("Internal Server Error");
	}
};

export default getPListDashBaord;

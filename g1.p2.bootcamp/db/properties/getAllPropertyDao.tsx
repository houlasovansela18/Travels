import connect from "../../config/db";
import Property from "../../model/frontend/properties/property";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getAllProperty = async (params: any) => {
	try {
		await connect();
		let resp;
		let hasFilter: boolean;
		params.filter.length === 0 ? (hasFilter = false) : (hasFilter = true);

		hasFilter
			? params.search.length === 0
				? (resp = await Property.find({ category: params.filter }))
				: (resp = await Property.find({
						category: params.filter,
						$or: [
							{ category: { $regex: params.search, $options: "i" } },
							{ title: { $regex: params.search, $options: "i" } },
							{ subtitle: { $regex: params.search, $options: "i" } },
							{ created_by: { $regex: params.search, $options: "i" } },
						],
				  }))
			: params.search.length === 0
			? (resp = await Property.find())
			: (resp = await Property.find({
					$or: [
						{ category: { $regex: params.search, $options: "i" } },
						{ title: { $regex: params.search, $options: "i" } },
						{ subtitle: { $regex: params.search, $options: "i" } },
						{ created_by: { $regex: params.search, $options: "i" } },
					],
			  }));
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

export default getAllProperty;

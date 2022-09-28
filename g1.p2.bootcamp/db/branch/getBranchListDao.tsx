import connect from "../../config/db";
import Address from "../../model/officers/employeeInfo/address";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getBranchList = async (params: any) => {
	try {
		await connect();
		let resp;
		params.search.lenght === 0
			? (resp = await Address.find().skip(params.skip).limit(params.limit))
			: (resp = await Address.find({
					$or: [
						{ category: { $regex: params.search, $options: "i" } },
						{ title: { $regex: params.search, $options: "i" } },
						{ subtitle: { $regex: params.search, $options: "i" } },
						{ description: { $regex: params.search, $options: "i" } },
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

export default getBranchList;

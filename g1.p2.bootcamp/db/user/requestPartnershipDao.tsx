import connect from "../../config/db";
import HisUser from "../../model/frontend/user/hisUser";
import UserUNA from "../../model/frontend/user/userUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let requestPartnership = async (data: any) => {
	try {
		await connect();
		let resp = await UserUNA.create(data);
		if (!resp) {
			return error501("Cannot Request for partnership, play try again later");
		}
		await HisUser.findOneAndUpdate({ _id: data._id }, data);
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "Request Success, waiting for approving from managerment",
			},
			data: resp.session,
		};
	} catch (e) {
		return error501("Internal Server Error");
	}
};

export default requestPartnership;

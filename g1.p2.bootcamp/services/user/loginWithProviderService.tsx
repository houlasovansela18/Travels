import getUserByEmail from "../../db/user/getUserByEmailDao";
import Status from "../../utils/Status";
import jwt from "jsonwebtoken";
import createUserWithProvider from "../../db/user/createUserWithProvider";
import error501 from "../../utils/error501";
import error403 from "../../utils/error403";
import updateUserDao from "../../db/user/updateUserDao";
import IntStatus from "../../utils/IntStatus";

let loginWithProvider = async (params: any) => {
	// get user by email
	let userByEmail = await getUserByEmail(params.email);
	if (userByEmail.resultMessage.status === Status.SUCCESS) {
		if (userByEmail.data.session) {
			return {
				resultMessage: userByEmail.resultMessage,
				data: userByEmail.data.session,
			};
		}
		let payload = {
			_id: userByEmail.data._id,
			name: params.first_name + " " + params.last_name || "",
			profile: params.profile_url,
			role: params.role,
			status: IntStatus.SUCCESS,
		};
		let newToken = await jwt.sign(payload, `${process.env.SECRET}`, {
			expiresIn: 60 * 60 * 60 * 24 * 7,
		});

		if (!newToken) {
			return error501("Cannot Generate the token");
		}

		// update data into data base
		const date = new Date();
		date.setDate(date.getDate() + 30);
		let _id = userByEmail.data._id.toString();
		if (typeof _id !== "string") {
			return error403("Login Error");
		}
		let preData = {
			session: newToken,
			session_ep: date,
			profile_url: params.profile_url,
		};

		let updateUser = await updateUserDao(_id, preData);

		return updateUser;
	}

	let createResp = await createUserWithProvider(params);
	if (createResp.resultMessage.status !== Status.SUCCESS) {
		return createResp;
	}
	// generate new token
	let payload = {
		_id: createResp.data._id,
		name: params.first_name + " " + params.last_name,
		profile: params.profile_url,
		role: params.role,
		status: IntStatus.SUCCESS,
	};
	let newToken = await jwt.sign(payload, `${process.env.SECRET}`, {
		expiresIn: 60 * 60 * 60 * 24 * 7,
	});

	if (!newToken) {
		return error501("Cannot Generate the token");
	}

	// update data into data base
	const date = new Date();
	date.setDate(date.getDate() + 30);
	let _id = createResp.data._id.toString();
	if (typeof _id !== "string") {
		return error403("Login Error");
	}
	let preData = {
		session: newToken,
		session_ep: date,
	};

	let updateUser = await updateUserDao(_id, preData);

	return updateUser;
};

export default loginWithProvider;

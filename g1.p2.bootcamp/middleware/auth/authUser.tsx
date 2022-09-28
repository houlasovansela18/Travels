import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import error403 from "../../utils/error403";
import jwt from "jsonwebtoken";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";
import findUserByUUID from "../../db/user/findUserByUUID";
import errorUnauthorized from "../../utils/errorUnauthorized";

let authUser = async (
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextApiHandler
) => {
	let error;
	try {
		//  check token
		let token = req.headers.authorization;
		if (typeof token !== "string") {
			error = errorUnauthorized("Unauthorized User");
			return res.status(error.resultMessage.statusCode).send(error);
		}

		token = token.replace("Bearer ", "");

		// verify token
		let decoded = await jwt.verify(token, `${process.env.SECRET}`);

		if (!decoded || typeof decoded === "string") {
			error = error403("");
			return res.status(error.resultMessage.statusCode).send(error);
		}

		const _id = decoded._id;
		// verify id
		const getUserByEmail = await findUserByUUID(_id);

		if (getUserByEmail.resultMessage.status !== Status.SUCCESS) {
			error = error403("");
			return res.status(error.resultMessage.statusCode).send(error);
		}

		let user = {
			_id: getUserByEmail.data._id,
			email: getUserByEmail.data.email,
			role: getUserByEmail.data.role,
			name:
				getUserByEmail.data.first_name + " " + getUserByEmail.data.last_name,
			profile: getUserByEmail.data.profile_url,
		};
		// req.user = user;

		next(req, res);
	} catch (e) {
		error = error501("");
		return res.status(error.resultMessage.statusCode).send(error);
	}
};

export default authUser;

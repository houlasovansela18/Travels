import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import error403 from "../../utils/error403";
import jwt from "jsonwebtoken";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";
import findEmployeeById from "../../db/employee/findEmployeeById";
import getEmployeeByToken from "../../db/employee/getEmployeeByTokenDao";

let initAuth = async (
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextApiHandler
) => {
	let error;
	try {
		//  check token
		let token = req.headers.authorization;
		if (typeof token !== "string") {
			error = error403("");
			return res.status(error.resultMessage.statusCode).send(error);
		}
		token = token.replace("Bearer ", "");
		// verify token
		let decoded = await jwt.verify(token, `${process.env.SECRET}`);
		if (!decoded || typeof decoded === "string") {
			error = error403("Invalid Request");
			return res.status(error.resultMessage.statusCode).send(error);
		}

		const email = decoded.email;
		const id = decoded.id;

		const getUserByToken = await getEmployeeByToken(token);

		if (getUserByToken.resultMessage.status !== Status.SUCCESS) {
			error = error403("Token Expired or Invalid Token");
			return res.status(error.resultMessage.statusCode).send(error);
		}

		// verify id
		const getUserByEmail = await findEmployeeById(id);

		if (getUserByEmail.resultMessage.status !== Status.SUCCESS) {
			error = error403("");
			return res.status(error.resultMessage.statusCode).send(error);
		}
		let user = {
			_id: getUserByEmail.data._id,
			id: getUserByEmail.data.id,
			email: getUserByEmail.data.email,
			role: getUserByEmail.data.role,
			name: getUserByEmail.data.name,
			profile: getUserByEmail.data.profile,
		};
		// req.user = user;
		next(req, res);
	} catch (e) {
		error = error501("");
		return res.status(error.resultMessage.statusCode).send(error);
	}
};

export default initAuth;

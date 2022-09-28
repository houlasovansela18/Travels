import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import authUser from "../../../../middleware/auth/authUser";
import handler from "../../../../middleware/handler";
import userSignoutService from "../../../../services/user/userSignoutService";

handler
	.use(authUser)
	.patch(async (req: NextApiRequest, res: NextApiResponse) => {
		let user = req.user;
		console.log(req);
		let resp = await userSignoutService(user);
		deleteCookie("authuser", { req, res });
		deleteCookie("pending", { req, res });
		return res.redirect("/");
	});

export default handler;

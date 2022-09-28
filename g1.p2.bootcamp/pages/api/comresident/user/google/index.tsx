import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import "../../../../../config/passport/google";

export default function (
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextApiHandler
) {
	passport.initialize();
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
	})(req, res, next);
}

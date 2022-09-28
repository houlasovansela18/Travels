import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import "../../../../../config/passport/facebook";

export default function (
	req: NextApiRequest,
	res: NextApiResponse,
	next: NextApiHandler
) {
	passport.authenticate("facebook", {
		scope: ["profile", "email"],
		session: false,
	})(req, res, next);
}

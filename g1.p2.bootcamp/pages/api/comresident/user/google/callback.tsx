import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import handler from "../../../../../middleware/handler";
import "../../../../../config/passport/google";
import error501 from "../../../../../utils/error501";
import loginWithProvider from "../../../../../services/user/loginWithProviderService";
import FRole from "../../../../../utils/FRole";

import { setCookie } from "cookies-next";
import nextSession from "next-session";
const getSession = nextSession();

handler
	.use(passport.initialize())
	.get(
		async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
			const session = await getSession(req, res);
			passport.authenticate("google", async (err, user, info) => {
				if (err || !user) {
					let err = error501("Cannot Login with google");
					console.log(err);
					return res.redirect("/");
				}

				let params = {
					first_name: user.given_name,
					last_name: user.family_name,
					provider_id: user.provider,
					email: user.email,
					profile_url: user.picture,
					role: FRole.Normal,
					created_by: user.provider,
					create_date: new Date(),
				};
				// console.log(user);
				let resp = await loginWithProvider(params);
				setCookie("authuser", resp.data, {
					req,
					res,
					maxAge: 60 * 6 * 24 * 30,
				});
				session.authToken = resp.data;
				return res.redirect("/");
			})(req, res, next);
		}
	);

export default handler;

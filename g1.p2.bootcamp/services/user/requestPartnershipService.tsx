import findUserByUUID from "../../db/user/findUserByUUID";
import FRole from "../../utils/FRole";
import IntStatus from "../../utils/IntStatus";
import Provider from "../../utils/Povider";
import requestPartnershipDao from "../../db/user/requestPartnershipDao";
import jwt from "jsonwebtoken";
let requestPartnership = async (user: any) => {
	let userResp = await findUserByUUID(user._id);

	let userData = userResp.data;

	userData.role = FRole.Partner;
	userData.status = IntStatus.PENDING;
	userData.created_by = Provider.SYSTEM;
	userData.created_date = new Date();

	let payload = {
		_id: userData._id,
		name: userData.first_name + " " + userData.last_name,
		profile: userData.profile_url,
		role: userData.role,
		status: IntStatus.PENDING,
	};
	let newToken = await jwt.sign(payload, `${process.env.SECRET}`, {
		expiresIn: 60 * 60 * 60 * 24 * 7,
	});

	userData.session = newToken;

	let resp = await requestPartnershipDao(userData.toJSON());
	return resp;
};

export default requestPartnership;

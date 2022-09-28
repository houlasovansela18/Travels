import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getLikeDetailDao from "../../db/like/getLikeDetailDao";
import deleteLikeDao from "../../db/like/deleteLikeDao";
import postLikeDao from "../../db/like/postLikeDao";
import deleteFromPropertyDao from "../../db/like/deleteFromPropertyDao";
import pushToPropertyDao from "../../db/like/pushToPropertyDao";

let liking = async (params: any) => {
	let liker_id = params.liker._id;
	let prop_id = params._id;

	if (typeof prop_id !== "string") {
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: null,
		};
	}

	let preData = {
		property_id: prop_id,
		liker_id: liker_id,
		like: true,
	};
	// check if already like
	let alreadyLike = await getLikeDetailDao(preData);
	if (alreadyLike.resultMessage.status === Status.SUCCESS) {
		await deleteLikeDao(preData);
		await deleteFromPropertyDao(preData);
		return {
			resultMessage: {
				status: Status.SUCCESS,
				statusCode: 201,
				errorMessage: "",
				message: "SUCCESS",
			},
			data: null,
		};
	}
	let data = {
		property_id: prop_id,
		liker_id: liker_id,
		liked_at: new Date(),
		like: true,
		status: IntStatus.SUCCESS,
	};
	let resp = await postLikeDao(data);
	let propData = {
		prop_id: prop_id,
		liker_id: liker_id,
	};
	await pushToPropertyDao(propData);

	return resp;
};

export default liking;

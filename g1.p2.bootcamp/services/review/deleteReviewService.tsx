import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getReviewByUUIDDao from '../../db/review/getReviewByUUIDDao';
import errorUnauthorized from "../../utils/errorUnauthorized";
import deleteReviewDao from '../../db/review/deleteReviewDao';
let deleteReview =async (editor:any , _id :String) => {

    // check if review is existed
    let hasReviewResp = await getReviewByUUIDDao(_id);

    if(hasReviewResp.resultMessage.status !== Status.SUCCESS){
        return hasReviewResp;
    }

    if(hasReviewResp.data.cmt_by !== editor._id){
        return errorUnauthorized('Anauthorized User')
    }


    let resp = await deleteReviewDao(_id)

    return resp;
}

export default deleteReview;
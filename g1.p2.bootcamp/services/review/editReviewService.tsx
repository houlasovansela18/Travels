import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getReviewByUUIDDao from '../../db/review/getReviewByUUIDDao';
import editReviewDao from '../../db/review/editReviewDao';
import errorUnauthorized from "../../utils/errorUnauthorized";

let editReview =async (editor:any , _id :String, data : any) => {

    // check if review is existed
    let hasReviewResp = await getReviewByUUIDDao(_id);

    if(hasReviewResp.resultMessage.status !== Status.SUCCESS){
        return hasReviewResp;
    }

    if(hasReviewResp.data.cmt_by !== editor._id){
        return errorUnauthorized('Anauthorized User')
    }
    data._id = _id;
    data.cmt_by = editor._id;
    data.cmt_at = new Date();
    data.status = IntStatus.SUCCESS;

    let resp = await editReviewDao(data)

    return resp;
}

export default editReview;
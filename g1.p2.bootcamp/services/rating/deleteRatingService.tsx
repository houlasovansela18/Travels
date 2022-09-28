import Status from "../../utils/Status";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getRatingByUUIDDao from '../../db/rating/getRatingByUUIDDao';
import deleteRatingDao from '../../db/rating/deleteRatingDao';

let deleteRating =async (editor:any , _id :String) => {

    // check if review is existed
    let hasReviewResp = await getRatingByUUIDDao(_id);

    if(hasReviewResp.resultMessage.status !== Status.SUCCESS){
        return hasReviewResp;
    }

    if(hasReviewResp.data.rater_id !== editor._id){
        return errorUnauthorized('Anauthorized User')
    }


    let resp = await deleteRatingDao(_id)

    return resp;
}

export default deleteRating;
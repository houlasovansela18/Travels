import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import errorUnauthorized from "../../utils/errorUnauthorized";
import getRatingByUUIDDao from '../../db/rating/getRatingByUUIDDao';
import editRatingDao from '../../db/rating/editRatingDao';

let editRating = async (editor:any , _id :String, data : any) => {

    // check if review is existed
    let hasReviewResp = await getRatingByUUIDDao(_id);

    if(hasReviewResp.resultMessage.status !== Status.SUCCESS){
        return hasReviewResp;
    }

    if(hasReviewResp.data.rater_id !== editor._id){
        return errorUnauthorized('Anauthorized User')
    }
    data._id = _id;
    data.rater_id = editor._id;
    data.rating_at = new Date();
    data.status = IntStatus.SUCCESS;

    let resp = await editRatingDao(data)

    return resp;
}

export default editRating;
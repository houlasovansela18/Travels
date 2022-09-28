import ratingDao from '../../db/rating/ratingDao';
let ratingService = async (rater :  any , data :any)=>{
    data.rater_id  = rater._id;
    data.rating_at  = new Date();

    let resp = ratingDao(data);
    return resp;
}

export default ratingService;
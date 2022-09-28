import reviewDao from '../../db/review/reviewDao';
let reviewService = async (cmtor :  any , data :any)=>{
    data.cmt_by  = cmtor._id;
    data.cmt_at  = new Date();

    let resp = reviewDao(data);
    return resp;
}

export default reviewService;
import getNumberLikeDao from '../../db/like/getNumberLikeDao';
import Status from '../../utils/Status';
let getLiking = async (params:any)=>{
    let liker_id = params.liker._id;
    let prop_id  = params._id;

    if(typeof(prop_id) !== 'string'){
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : 0
        }
    }

    let preData = {
        property_id : prop_id,
        liker_id    : liker_id,
        like        : true 
    } 
    
    let resp = await getNumberLikeDao(preData);
    return resp;
}

export default getLiking;
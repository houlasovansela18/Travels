import error403 from "../../utils/error403";
import error404 from "../../utils/error404";
import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getPropertyByUUIDDao from '../../db/properties/getPropertyByUUIDDao';
import getBoostingByProUUIDDao  from '../../db/boosting/getBoostingByProUUIDDao';
import createBoostingDao from '../../db/boosting/createBoostingDao';
import getBoostingUNAByProUUIDDao from '../../db/boosting/getBoostingUNAByProUUIDDao';

let createBoosting = async (creator:any, data: any)=>{
    // check if require data is valid
    if(data.product_id === null || data.boost_days === null || data.zone === null){
        return error403('Invalid Request')
    }
    // check if boosting product is existed
    let getPropertyResp = await getPropertyByUUIDDao(data.product_id);
    if(getPropertyResp.resultMessage.status !== Status.SUCCESS){
        return error404('Boosting Product Not Found')
    }
    // check if product is already boosting
    let getBoostingResp = await getBoostingByProUUIDDao(data.product_id)
    if(getBoostingResp.resultMessage.status === Status.SUCCESS){
        return error403('Product already boosted')
    }
    //check if product is waitig for boosting approving
    let getBoostingUNA = await getBoostingUNAByProUUIDDao(data.product_id);
    if(getBoostingUNA.resultMessage.status === Status.SUCCESS){
        return error403('Product already boosted')
    }
    data.created_by = creator.id;
    data.created_at = new Date();
    data.status     = IntStatus.PENDING;

    // create Boosting
    let createBoostingResp = await createBoostingDao(data.toJSON());

    return createBoostingResp;
}

export default createBoosting;
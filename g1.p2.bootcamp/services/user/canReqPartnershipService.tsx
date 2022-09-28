import error403 from "../../utils/error403";
import Status from "../../utils/Status";
import findUserUNAByUUIDDao from '../../db/user/findUserUNAByUUIDDao';
import canReqPartnershipDao from '../../db/user/canReqPartnershipDao';
let canReqPartnership = async (cancelor:any)=>{
    //get user by id
    let userUNAResp = await findUserUNAByUUIDDao(cancelor._id);
    if(userUNAResp.resultMessage.status !== Status.SUCCESS){
        return error403('Unauthorized User')
    }

    let resp = await canReqPartnershipDao(cancelor._id);
    return resp;

}

export default canReqPartnership;
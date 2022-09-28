import findUserUNAByUUID from "../../db/user/findUserUNAByUUIDDao";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import editApprPartnershipDao from '../../db/user/editApprPartnershipDao';

let editApprUser = async (editor:any, _id:String, data:any)=>{
        // auth
        if(editor.role === Role.Normal){
            return errorUnauthorized('Unauthorized User')
        }
    
    
        // if user existed
        let isExisted = await findUserUNAByUUID(_id);
        if(isExisted.resultMessage.status !== Status.SUCCESS){
            return isExisted
        }
    
        
        data.created_by = editor.id;
        data.created_at = new Date();
        data.status = IntStatus.PENDING;
        data._id = _id
    
        let resp = await editApprPartnershipDao(data);
        return resp;
}

export default editApprUser;
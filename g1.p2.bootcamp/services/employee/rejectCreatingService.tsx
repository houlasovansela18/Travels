import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import findEmployeeUNAByIdDao from '../../db/employee/findEmployeeUNAByIdDao'
import Role from "../../utils/Role";
import error404 from "../../utils/error404";
import IntStatus from "../../utils/IntStatus";
import rejectCreatingDao  from '../../db/employee/rejectCreatingDao';

let rejectCreatingService = async (modifier : any, _id : String, rejectReason:String)=>{
    // auth 
    if(modifier.role === Role.Normal){
        return errorUnauthorized('Unauthorization user')
    }
    let waitingForApprove = await findEmployeeUNAByIdDao(_id);
    if(waitingForApprove.resultMessage.status !== Status.SUCCESS){
        return error404('User Not Found')
    }
    let approvingUser = waitingForApprove.data.toJSON();
    if(modifier.role === Role.Manager){
        if(approvingUser.role < modifier.role){
            return errorUnauthorized('Unauthorization user')
        }  
    }

    approvingUser.status = IntStatus.REJECTED;
    approvingUser.rejected_reason = rejectReason;
    approvingUser.modified_by = modifier.id;
    approvingUser.created_date  = new Date(approvingUser.created_date);
    approvingUser.modified_date = new Date();
    let resp = await  rejectCreatingDao( approvingUser )
    return resp;
    
}

export default rejectCreatingService;
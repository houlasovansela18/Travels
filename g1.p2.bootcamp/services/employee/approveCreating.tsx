import error404 from "../../utils/error404";
import errorUnauthorized from "../../utils/errorUnauthorized";
import IntStatus from "../../utils/IntStatus";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import findEmployeeUNAByIdDao  from '../../db/employee/findEmployeeUNAByIdDao';
import approveCreateDao from '../../db/employee/approveCreateDao';
let approveCreating =async (modifier:any, _id :String) => {
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
    approvingUser.modified_by   = modifier.id;
    approvingUser.modified_date = new Date();
    approvingUser.created_date  = new Date(approvingUser.created_date);
    approvingUser.is_active     = true;
    approvingUser.status        = IntStatus.SUCCESS

    // insert data to Employee
    let approveEmployee  = await approveCreateDao(approvingUser);
    return approveEmployee;
}

export default approveCreating;
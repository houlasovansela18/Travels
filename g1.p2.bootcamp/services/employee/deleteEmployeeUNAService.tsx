import error404 from "../../utils/error404";
import errorUnauthorized from "../../utils/errorUnauthorized";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import findEmployeeByIdDashIdUNADao from '../../db/employee/findEmployeeByIdDashIdUNADao';
import deleteEmployeeUNADao from '../../db/employee/deleteEmployeeUNADao';
import findEmployeeUNAByIdDao from '../../db/employee/findEmployeeUNAByIdDao';

let deleteEmployeeUNAService = async (deletor:any, _id:String)=>{
        // auth 
        if(deletor.role === Role.Normal){
            const params = {
                _id : _id,
                created_by : deletor.id
            }
            let approvingUserResp = await findEmployeeByIdDashIdUNADao(params);
            if(approvingUserResp.resultMessage.status !== Status.SUCCESS){
                return errorUnauthorized('Unauthorization user')
            }
            const editingEmployee = approvingUserResp.data;

            let resp = await deleteEmployeeUNADao(editingEmployee.id);
            return resp;
        }
    
        let waitingForApprove = await findEmployeeUNAByIdDao(_id);
        if(waitingForApprove.resultMessage.status !== Status.SUCCESS){
            return error404('User Not Found')
        }
    
        let approvingUser = waitingForApprove.data;
        if(deletor.role === Role.Manager){
            if(approvingUser.role < deletor.role){
                return errorUnauthorized('Unauthorization user')
            }  
        }
        let resp = await deleteEmployeeUNADao(approvingUser.id);
        
        return resp;
}

export default deleteEmployeeUNAService;
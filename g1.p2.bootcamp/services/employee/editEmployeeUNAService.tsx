import errorUnauthorized from "../../utils/errorUnauthorized";
import Role from "../../utils/Role";
import findEmployeeUNAByIdDao from '../../db/employee/findEmployeeUNAByIdDao';
import error404 from "../../utils/error404";
import Status from "../../utils/Status";
import findEmployeeByIdDashIdUNADao from '../../db/employee/findEmployeeByIdDashIdUNADao';
import updateEmployeeUNADao from '../../db/employee/updateEmployeeUNADao';
import bcrypt from  'bcrypt';
import error501 from "../../utils/error501";

let editEmployeeUNAService = async (editor:any, _id :String, user : any) => {
    // auth 
    if(editor.role === Role.Normal){
        const params = {
            _id : _id,
            created_by : editor.id
        }
        let approvingUserResp = await findEmployeeByIdDashIdUNADao(params);
        if(approvingUserResp.resultMessage.status !== Status.SUCCESS){
            return errorUnauthorized('Unauthorization user')
        }

        let editingEmployee = approvingUserResp.data.toJSON();
        user.created_by = editor.id;
        user.created_date = new Date();
        if(user.password){
            let password = user.password;
            let hashPassword = await bcrypt.hash(password, 8);
            if(!hashPassword){
                return error501('Cannot edit user')
            }
            user.password = hashPassword
        }
        let resp = await updateEmployeeUNADao(editingEmployee.id, user);
        return resp;
    }

    let waitingForApprove = await findEmployeeUNAByIdDao(_id);
    if(waitingForApprove.resultMessage.status !== Status.SUCCESS){
        return error404('User Not Found')
    }

    let approvingUser = waitingForApprove.data.toJSON();
    if(editor.role === Role.Manager){
        if(approvingUser.role < editor.role){
            return errorUnauthorized('Unauthorization user')
        }  
    }

    user.created_by = editor.id;
    user.created_date = new Date();
    if(user.password){
        let password = user.password;
        let hashPassword = await bcrypt.hash(password, 8);
        if(!hashPassword){
            return error501('Cannot edit user')
        }
        user.password = hashPassword
    }
    let resp = await updateEmployeeUNADao(approvingUser.id, user);
    
    return resp;

}

export default editEmployeeUNAService;
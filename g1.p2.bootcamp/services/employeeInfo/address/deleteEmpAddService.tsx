import error403 from "../../../utils/error403";
import Status from "../../../utils/Status";
import findEmployeeAddByUUIDDao from '../../../db/employeeInfo/findEmployeeAddByUUIDDao';
import Role from "../../../utils/Role";
import errorUnauthorized from "../../../utils/errorUnauthorized";
import deleteEmployeeAddDao from '../../../db/employeeInfo/deleteEmployeeAddDao';

let editEmpAdd =  async (editor: any, _id : String) =>{

    // onleu admin or manager can't delete
    if(editor.role > Role.Manager){
        return errorUnauthorized('Unauthorized')
    }

    // check user address
    let userAdd = await findEmployeeAddByUUIDDao(_id);
    if(userAdd.resultMessage.status !== Status.SUCCESS){
        return error403('Invalid Request')
    }

    let resp = await deleteEmployeeAddDao(_id);

    return resp;
}

export default editEmpAdd ;
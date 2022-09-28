import error403 from "../../../utils/error403";
import Status from "../../../utils/Status";
import Role from "../../../utils/Role";
import errorUnauthorized from "../../../utils/errorUnauthorized";
import findEmpEduByUUIDDao from '../../../db/employeeInfo/findEmpEduByUUIDDao';
import deleteEmpEduDao  from '../../../db/employeeInfo/deleteEmpEduDao';

let editEmpAdd =  async (editor: any, _id : String) =>{

    // onleu admin or manager can't delete
    if(editor.role > Role.Manager){
        return errorUnauthorized('Unauthorized')
    }

    // check user address
    let userAdd = await findEmpEduByUUIDDao(_id);
    if(userAdd.resultMessage.status !== Status.SUCCESS){
        return error403('Invalid Request')
    }

    let resp = await deleteEmpEduDao(_id);

    return resp;
}

export default editEmpAdd ;
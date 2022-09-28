import error403 from "../../../utils/error403";
import Status from "../../../utils/Status";
import findEmployeeAddByUUIDDao from '../../../db/employeeInfo/findEmployeeAddByUUIDDao';
import updateEmployeeAddDao  from '../../../db/employeeInfo/updateEmployeeAddDao';

let editEmpAdd =  async (editor: any, _id : String, data :any) =>{
    // check user address
    let userAdd = await findEmployeeAddByUUIDDao(_id);
    if(userAdd.resultMessage.status !== Status.SUCCESS){
        return error403('Invalid Request')
    }

    data.created_by = editor.id;
    data.created_date = new Date();
    data._id = _id;
    let resp = await updateEmployeeAddDao(data);

    return resp;
}

export default editEmpAdd ;
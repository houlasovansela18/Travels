import error403 from "../../../utils/error403";
import Status from "../../../utils/Status";
import findEmpEduByUUIDDao from '../../../db/employeeInfo/findEmpEduByUUIDDao';
import updateEmpEduDao from '../../../db/employeeInfo/updateEmpEduDao';

let editEmpAdd =  async (editor: any, _id : String, data :any) =>{
    // check user education
    let userAdd = await findEmpEduByUUIDDao(_id);
    if(userAdd.resultMessage.status !== Status.SUCCESS){
        return error403('Invalid Request')
    }

    data.created_by = editor.id;
    data.created_date = new Date();
    data._id = _id;
    let resp = await updateEmpEduDao(data);

    return resp;
}

export default editEmpAdd ;
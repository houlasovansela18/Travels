import findEmployeeById from "../../../db/employee/findEmployeeById";
import error403 from "../../../utils/error403";
import Status from "../../../utils/Status";
import findEmployeeAddByUserIdDao  from '../../../db/employeeInfo/findEmployeeAddByUserIdDao';
import createAddDao from '../../../db/employeeInfo/createAddDao';
import error501 from "../../../utils/error501";
import updateEmployeeDao from "../../../db/employee/updateEmployeeUNADao";

let createdEmpAdd = async (creator:any, data:any)=>{

    // check if user is existed in Employee table 
    let  findEmployee  = await findEmployeeById(data.user_id); 
    if(findEmployee.resultMessage.status !== Status.SUCCESS ){
        return findEmployee;
    }
    // check if user address already existed
    let findUserAdd = await findEmployeeAddByUserIdDao(data.user_id);
    if(findUserAdd.resultMessage.status === Status.SUCCESS ){
        return error403('User Add Already Exist');
    }
    
    data.created_by = creator.id;
    data.creared_at = new Date();
  
   let resp = await createAddDao(data);
    
   if(resp.resultMessage.status !== Status.SUCCESS){
     return  error501('Internal Server Error')
   }
   // update employee 
   let params =  {
        add_id : findUserAdd.data._d
   }

   let updateEmployee = await updateEmployeeDao(data.user_id, params);

   return updateEmployee;
}

export default createdEmpAdd;
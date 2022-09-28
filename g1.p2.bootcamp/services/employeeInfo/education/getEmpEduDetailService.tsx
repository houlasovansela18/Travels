import getEmpEduDetailDao from '../../../db/employeeInfo/getEmpEduDetailDao';
let getEmpEduDetail = async (_id:String)=>{
    let resp = await getEmpEduDetailDao(_id);
    return resp;
}

export default getEmpEduDetail;
import getEmpAddDetailDao  from '../../../db/employeeInfo/getEmpAddDetailDao';
let getEmpAddDetail = async (_id:String)=>{
    let resp = await getEmpAddDetailDao(_id);
    return resp;
}

export default getEmpAddDetail;
import getEmployeeDetailDao from '../../db/employee/getEmployeeDetailDao';
let getEmployeeDetail = async (params: any)=>{
    let resp = await getEmployeeDetailDao(params);
    return resp;
}

export default getEmployeeDetail;
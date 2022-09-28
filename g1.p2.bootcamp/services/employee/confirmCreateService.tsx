import findEmployeeById from "../../db/employee/findEmployeeById";
import error501 from "../../utils/error501";
import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import findEmployeeByIdTMP from '../../db/employee/findEmployeeByIdTMPDao';
import confirmCreateDao  from '../../db/employee/confirmCreateDao';

let confirmCreateEmployee = async (creator: any, _id : String)=>{

    // check if confirm and creator is the same person
    let predata = {
        created_by : creator.id,
        _id  : _id
    }
    let userResp = await findEmployeeByIdTMP(predata);
    if(userResp.resultMessage.status !== Status.SUCCESS){
        return errorUnauthorized('Unauthorize user')
    }
    // insert into una table, waiting for approving
    let data = userResp.data.toJSON();
    data.created_date = new Date(userResp.data.created_date)
    let unaResp = await confirmCreateDao(data);

    return unaResp;

}

export default confirmCreateEmployee;
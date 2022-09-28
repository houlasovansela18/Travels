import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import findReportByUUIDDao from '../../db/reporting/findReportByUUIDDao';
import updateReportDao from '../../db/reporting/updateReportDao';

let editReport = async (editor:any, _id:String, data:any)=>{

    // check by id
    let isExisted = await findReportByUUIDDao(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

    if(isExisted.data.reporter_id !== editor._id){
        return errorUnauthorized('User Unauthorized')
    }

    data.reported_at = new Date()
    data.reporter_id = editor._id
    data._id = _id
    let updateReportResp = await updateReportDao(data);

    return updateReportResp;
}


export default editReport;
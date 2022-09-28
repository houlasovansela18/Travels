import errorUnauthorized from "../../utils/errorUnauthorized";
import Status from "../../utils/Status";
import findReportByUUIDDao from '../../db/reporting/findReportByUUIDDao';
import deleteReportDao from '../../db/reporting/deleteReportDao';
let deleteReport = async (editor:any, _id:String)=>{

    // check by id
    let isExisted = await findReportByUUIDDao(_id);
    if(isExisted.resultMessage.status !== Status.SUCCESS){
        return isExisted;
    }

    if(isExisted.data.reporter_id !== editor._id){
        return errorUnauthorized('User Unauthorized')
    }

    let updateReportResp = await deleteReportDao(_id);

    return updateReportResp;
}


export default deleteReport;
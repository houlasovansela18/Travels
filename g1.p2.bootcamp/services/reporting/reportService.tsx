import IntStatus from "../../utils/IntStatus";
import Status from "../../utils/Status";
import getByRepAndUserID from '../../db/reporting/getByRepAndUserIDDao';
import createReportingDao from '../../db/reporting/createReportingDao';

let report = async (reporter:any , data:any)=>{
    // check if report already report the same user
    let params = {
        user_id : data.user_id,
        reporter_id : reporter._id
    }

    let checkReportResp = await getByRepAndUserID(params);

    if(checkReportResp.resultMessage.status === Status.SUCCESS){
        checkReportResp 
    }

    // create reporting
    data.reporter_id = reporter._id
    data.reported_at = new Date()
    data.status = IntStatus.SUCCESS
    let reportingResp = await createReportingDao(data);

    return reportingResp
}

export default report ;
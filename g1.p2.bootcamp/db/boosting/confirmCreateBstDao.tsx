import connect from "../../config/db";
import boostTMP from "../../model/officers/boosting/boostingTMP";
import boostUNA from "../../model/officers/boosting/boostingUNA";
import hisBoost from "../../model/officers/boosting/hisBoosting";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let confirmCreateBst = async (data: any)=>{
    try{
        await connect();
        let confirmCreate = await boostUNA.create(data);
        if(!confirmCreate){
            return error501('Internal Server Error')
        }
        // remove from temp table 
        let rm = await boostTMP.findOneAndDelete({_id:data._id})
        if(!rm){
            return error501("Internal Server Error")
        }
        // insert into history table
        await hisBoost.create(data)

        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default confirmCreateBst;
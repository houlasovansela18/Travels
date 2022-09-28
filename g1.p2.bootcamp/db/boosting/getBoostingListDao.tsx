import connect from "../../config/db";
import Boost from "../../model/officers/boosting/boosting";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getBoostingList = async (skip : Number, limit:Number, status: Number, search : String)=>{
    try{
        await connect();
        let resp ;
        search.length === 0 ? resp = await Boost
                                .find({
                                    status : status
                                })
                                .skip(skip)
                                .limit(limit) 
                            : resp = await Boost
                            .find({
                                status : status,
                                created_by : { "$regex": search, "$options": "i" }
                            })
                            .skip(skip)
                            .limit(limit) 

        if(!resp){
            return error404('Cannot Find Boosting')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getBoostingList;
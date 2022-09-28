import connect from "../../config/db";
import Address from "../../model/officers/employeeInfo/address";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getAddressList = async (params:any)=>{
    try{
        await connect();
        let resp ;
        params.search.lenght === 0 ?
        resp = await Address.find()
                             .skip(params.skip)
                             .limit(params.limit)
        :
        resp = await Address.find({
            $or : [
                {province : { "$regex": params.search, "$options": "i" }},
                {national_id         : { "$regex": params.search, "$options": "i" }},
                {passport_id : { "$regex": params.search, "$options": "i" }},
                {created_by : { "$regex": params.search, "$options": "i" }}
            ]

        })
        .skip(params.skip)
        .limit(params.limit)

        if(!resp){
            return error404('Data Not Found')
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

export default getAddressList;
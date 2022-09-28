import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import Education from "../../model/officers/employeeInfo/education";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEducationList = async (params:any)=>{
    try{
        await connect();
        let resp ;
        params.search.lenght === 0 ?
        resp = await Education.find()
                             .skip(params.skip)
                             .limit(params.limit)
        :
        resp = await Education.find({
            $or : [
                {user_id : { "$regex": params.search, "$options": "i" }},
                {school         : { "$regex": params.search, "$options": "i" }},
                {degree : { "$regex": params.search, "$options": "i" }},
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

export default getEducationList;
import connect from "../../config/db";
import Employee from "../../model/officers/employee/employee";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getEmployeeList = async (params:any)=>{
    try{
        await connect();
        let resp ;
        params.search.lenght === 0 ?
        resp = await Employee.find()
                             .skip(params.skip)
                             .limit(params.limit)
        :
        resp = await Employee.find({
            status : params.status,
            $or : [
                {created_by : { "$regex": params.search, "$options": "i" }},
                {id         : { "$regex": params.search, "$options": "i" }},
                {phone_number : { "$regex": params.search, "$options": "i" }},
                {name : { "$regex": params.search, "$options": "i" }},
                {email : { "$regex": params.search, "$options": "i" }}
            ]

        })
        .where('role').gt(params.userRole - 1).lt(10)
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

export default getEmployeeList;
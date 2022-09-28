import hisEmployee from "../../model/officers/employee/hisEmployee";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";
import connect from '../../config/db';
import EmployeeTMP from "../../model/officers/employee/employeeTMP";
import UserTMP from "../../model/frontend/user/userTMP";
import HisUser from "../../model/frontend/user/hisUser";

let createUserDao =async (user:any) => {
    try{
        // connect to pool
        await connect();
 
        let createUser = await  UserTMP.create(user);
        if(!createUser){
            return error501("Can't crate User Partner")
        }
        // store in his table
        await HisUser.create(user);

        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    } catch(e){
        return error501('Internal Server Error.')
    }
}


export default createUserDao;
import hisEmployee from "../../model/officers/employee/hisEmployee";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";
import connect from '../../config/db';
import EmployeeTMP from "../../model/officers/employee/employeeTMP";

let createEmployeeDao =async (user:any) => {
    try{
        // connect to pool

        await connect();
        let find = await EmployeeTMP.findOne({id:user.id})
        if(find){
            let update = await EmployeeTMP.findOneAndUpdate({id:user.id})
            if(!update){
                return error501('Cannot created Employee')
            }
            return {
                resultMessage : {
                    status : Status.SUCCESS,
                    statusCode : 201, 
                    errorMessage : '',
                    message : 'SUCCESS'
                },
                data : update._id
            }
        }
        let createUser = await  EmployeeTMP.create(user);
        if(!createUser){
            return error501("Can't create employee")
        }
        // store in his table
        await hisEmployee.create(user);

        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201, 
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : createUser._id
        }
        console.log('testing3')
    } catch(e){
        return error501('Internal Server Error.')
    }
}


export default createEmployeeDao;
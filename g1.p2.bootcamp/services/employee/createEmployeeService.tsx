import validator from 'validator';
import error403 from '../../utils/error403';
import Status from '../../utils/Status';
import bcrypt from 'bcrypt';
import error501 from '../../utils/error501';
import errorUnauthorized from '../../utils/errorUnauthorized';
import getEmployeeByEmail from '../../db/employee/getEmployeeByEmail';
import createEmployeeDao  from '../../db/employee/createEmployeeDao';
import getEmployeeByIdUNA from '../../db/employee/getEmployeeByIdUNADao';
import IntStatus from '../../utils/IntStatus';
let createEmployeeService = async (creator:any , user:any) =>{

    if(parseInt(creator.role) > parseInt(user.role)){
        return errorUnauthorized('create User validated')
    }
    // user email 
    const userEmail = user.email;
    const userId    = user.id;
    const isEmail  = validator.isEmail(userEmail);
    if(!isEmail){
        return error403('Invalid Email')
    }
    // check if email is existed
    let getUserByEmailResp = await getEmployeeByEmail(userEmail);

    if(getUserByEmailResp.resultMessage.status === Status.SUCCESS){
        return error403('Email is already existed')
    }
    
    // check on UNA table 
    let employeeByIdUNA = await getEmployeeByIdUNA(userId)
    if(employeeByIdUNA.resultMessage.status === Status.SUCCESS){
        return error403('ID is already existed, waiting for approve')
    }


    if(!user.password || user.password.length < 4){
        return error403('Invalid Password')
    }
    // hash password
    let password = user.password;
    let hashPassword = await bcrypt.hash(password, 8);
    if(!hashPassword){
        return error501('Error Hashing Password')
    }
    
    user.password = hashPassword;
    user.created_by = creator.id;
    user.created_date = new Date();
    user.status   = IntStatus.PENDING
    let createUserResp = await createEmployeeDao(user);
    return createUserResp;
}

export default createEmployeeService;
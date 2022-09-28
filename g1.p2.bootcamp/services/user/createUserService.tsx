import validator from 'validator';
import error403 from '../../utils/error403';
import Status from '../../utils/Status';
import bcrypt from 'bcrypt';
import error501 from '../../utils/error501';
import getUserByEmail from '../../db/user/getUserByEmailDao';
import getUserUNAByEmail from '../../db/user/getUserUNAByEmail';
import createUserDao from '../../db/user/createUserDao';
import FRole from '../../utils/FRole';

let createUser = async (creator:any , user:any) =>{
    // user email 
    const userEmail = user.email;
    const isEmail  = validator.isEmail(userEmail);
    if(!isEmail){
        return error403('Invalid Email')
    }
    // check if email is existed
    let getUserByEmailResp = await getUserByEmail(userEmail);

    if(getUserByEmailResp.resultMessage.status === Status.SUCCESS){
        return error403('Email is already existed')
    }
    
    // check on UNA table 
    let userUNAResp = await getUserUNAByEmail(userEmail)
    if(userUNAResp.resultMessage.status === Status.SUCCESS){
        return error403('ID is already existed, waiting for approve')
    }

    if(!user.password || user.passowrd.length < 4){
        return error403('Invalid Password')
    }

    // hash password
    let password = user.password;
    let hashPassword = await bcrypt.hash(password, 8);
    if(!hashPassword){
        return error501('Error Hashing Password')
    }
    
    user.role = FRole.Partner;
    user.password = hashPassword;
    user.created_by = creator.id;
    user.created_at = new Date();
    user.status   = Status.PENDING

    let createUserResp = await createUserDao(user.toJSON());
    return createUserResp;
}

export default createUser;
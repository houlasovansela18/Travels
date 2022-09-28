import error403 from "../../utils/error403";
import Provider from "../../utils/Povider";
import Status from "../../utils/Status";
import FRole  from '../../utils/FRole';
import IntStatus from "../../utils/IntStatus";
import getUserByEmailDao from '../../db/user/getUserByEmailDao';
import signUpDao from '../../db/user/signUpDao';
import bcrypt from 'bcrypt';
import error501 from "../../utils/error501";

let signUp = async (data:any) =>{
    // check if email is existed
    let email = data.email;
    let isEmailExistedResp = await getUserByEmailDao(email);
    if(isEmailExistedResp.resultMessage.status === Status.SUCCESS){
        return error403('Email already existed')
    }
    
    // hash password
    let password = data.password;
    let hashPassword = await bcrypt.hash(password, 8);
    if(!hashPassword){
        return error501('Error Hashing Password')
    }
    // data some detail
    data.role        = FRole.Normal;
    data.provider_id = Provider.SYSTEM;
    data.status      = IntStatus.SUCCESS;
    data.password    = hashPassword;
    
    let createResp = await signUpDao(data);
    return createResp;
}

export default signUp;
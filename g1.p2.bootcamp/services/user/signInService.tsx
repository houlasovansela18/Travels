import getUserByEmail from "../../db/user/getUserByEmailDao";
import error403 from "../../utils/error403";
import Status from "../../utils/Status";
import bcrypt from 'bcrypt';
import error501 from "../../utils/error501";
import jwt from 'jsonwebtoken';
import updateUserDao from '../../db/user/updateUserDao';

let SignIn = async (data:any)=>{
    // check if data is valid
    if(!data.email || !data.password){
        
        return error403('Invalid Request')
    }

    // check user by email
    let getUserByEmailResp = await getUserByEmail(data.email); 
    if(getUserByEmailResp.resultMessage.status !== Status.SUCCESS){
        return error403('Invalide Email')
    }

    // compare password
    let hashPassword   = getUserByEmailResp.data.password;
    let isMatched = await bcrypt.compare(data.password, hashPassword);
    if(!isMatched){
        return error403('Invalid Password')
    }

    // generate new token 
    let payload = {
        _id     : getUserByEmailResp.data._id,
        name    : getUserByEmailResp.data.first_name + " " + getUserByEmailResp.data.last_name,
        profile : getUserByEmailResp.data.profile,
        role    : getUserByEmailResp.data.role
    }

    let newToken =  await jwt.sign(
      payload,
      `${process.env.SECRET}`, 
      { expiresIn: 60 * 60 * 60 * 24 * 7 });
    
    if(!newToken){
        return error501('Cannot Generate the token');
    }

    // update data into data base
    const date = new Date();
    date.setDate(date.getDate() + 30);
    let _id = getUserByEmailResp.data._id.toString();
    if(typeof(_id) !== 'string'){
        return error403('Login Error')
    }
    let preData= {
        session   : newToken,
        session_ep: date
    }

    let updateUser = await updateUserDao(_id, preData);
    
    return updateUser;
}

export default SignIn;
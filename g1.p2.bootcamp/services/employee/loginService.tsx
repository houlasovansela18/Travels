import error403 from "../../utils/error403";
import error404 from "../../utils/error404";
import Status from "../../utils/Status";
import bcrypt  from 'bcrypt';
import error501 from "../../utils/error501";
import jwt from 'jsonwebtoken';
import generateHardToken from "../../utils/generateHardToken";
import mailer from '../../config/mailer';
import findEmployeeById from '../../db/employee/findEmployeeById';
import updateEmployeeDao from '../../db/employee/updateEmployeeDao';

let Login = async (user:any) =>{
    try {
        if(user === null || !user.id || !user.password){
            return error403('')
        }
    
        // find user by userId 
        let userResp = await findEmployeeById(user.id);
        
        if(userResp.resultMessage.status !== Status.SUCCESS) {
            return error404('');
        }
        
        // compare password
        let reqPassword = user.password;
        let hashPassword = userResp.data.password;
    
        let isMatched = await bcrypt.compare(reqPassword, hashPassword);
        if(!isMatched){
            return error403('');
        }

        // generate new token 
        let payload = {
            _id     : userResp.data._id,
            id      : userResp.data.id, 
            name    : userResp.data.name,
            profile : userResp.data.profile,
            role    : userResp.data.role
        }

        let newToken =  await jwt.sign(
          payload,
          `${process.env.SECRET}`, 
          { expiresIn: 60 * 60 * 60 * 24 * 7 });
        
        if(!newToken){
            return error501('');
        }
         
        const hardToken = generateHardToken(6);

        if(hardToken.toString().length !== 6){
            return error501('');
        }

        // update data into data base
        const date = new Date();
        date.setDate(date.getDate() + 30);
        let preData = {
            session   : newToken,
            hardtoken : hardToken,
            session_ep: date
        }

        let updateUser = await updateEmployeeDao(user.id, preData);
        if(updateUser.resultMessage.status !== Status.SUCCESS){
            return error501('')
        }
        
        // two factor by hardtoken
        let destiny = userResp.data.email;
        let subject = 'Two Factor';
        let text    = 'confirm code : ' + `${hardToken}`
        let sendingMail = await mailer(destiny, subject, text);

        sendingMail.data =  userResp.data._id 
        return sendingMail;
        
    }catch(e){
        return error501('');
    }
}

export default Login;
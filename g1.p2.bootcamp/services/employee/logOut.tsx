import logOutDao from '../../db/employee/logOutDao';
let logOut = async (user:any)=>{
    user.hardtoken = '';
    user.session   = '';
    user.session_ep = null;
    let resp = await logOutDao(user);

    return resp;
}

export default  logOut;
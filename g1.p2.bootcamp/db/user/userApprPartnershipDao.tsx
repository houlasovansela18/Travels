import connect from "../../config/db";
import HisUser from "../../model/frontend/user/hisUser";
import User from "../../model/frontend/user/user";
import UserUNA from "../../model/frontend/user/userUNA";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let userApprPartnership = async (data:any)=>{
    try{
        await connect();
        let apprResp = await User.findOneAndUpdate({_id:data._id},data);
        if(!apprResp){
            return error501('Cannot approve user for partnership, try again')
        }
        await UserUNA.findOneAndDelete({_id:data._id})
        await HisUser.findOneAndUpdate({_id:data._id},data)
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default userApprPartnership;
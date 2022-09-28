import connect from "../../config/db";
import User from "../../model/frontend/user/user";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let getUserDetail = async (params:any)=>{
    try{
        await connect();
        let resp  = await User.findOne(params);
        if(!resp){
            return error404('User Not Fouond')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data: {
                role : resp.role,
                provider_id : resp.provider_id,
                first_name : resp.first_name,
                last_name : resp.last_name,
                phone_number : resp.phone_number,
                email : resp.email,
                add_id : resp.add_id,
                edu_id : resp.edu_id,
                profile_url : resp.profile_url
            }
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default getUserDetail;
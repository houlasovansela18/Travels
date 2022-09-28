import connect from "../../config/db";
import UserUNA from "../../model/frontend/user/userUNA";
import error404 from "../../utils/error404";
import error501 from "../../utils/error501";
import Status from "../../utils/Status";

let canReqPartnership = async (_id:String)=>{
    try{
        await connect()
        let resp = await UserUNA.findOneAndDelete({_id:_id})
        if(!resp){
            return error404('Cannot cancel requestpartnership, please try again')
        }
        return {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage: '',
                message : 'SUCCESS'
            },
            data: null
        }
    }catch(e){
        return error501('Internal Server Error')
    }
}

export default canReqPartnership;
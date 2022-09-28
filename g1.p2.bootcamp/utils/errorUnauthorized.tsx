import Status from "./Status"

export default (errorMessage:string)=>{
    return {
        resultMessage : {
            status : Status.ERROR,
            statusCode : 401,
            errorMessage ,
            message : 'Unauthorization'
        },
        data : null
    }
}
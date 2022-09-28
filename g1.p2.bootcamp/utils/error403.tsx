import Status from "./Status"

export default (errorMessage:string)=>{
    return {
        resultMessage : {
            status : Status.ERROR,
            statusCode : 403,
            errorMessage ,
            message : 'Invalid Request'
        },
        data : null
    }
}
import Status from "./Status"

export default (errorMessage:string)=>{
    return {
        resultMessage : {
            status : Status.ERROR,
            statusCode : 501,
            errorMessage ,
            message : 'Internal Server Error.'
        },
        data : null
    }
}
import Status from "./Status"

export default (errorMessage:string)=>{
    return {
        resultMessage : {
            status : Status.ERROR,
            statusCode : 404,
            errorMessage ,
            message : 'Page not found'
        },
        data : null
    }
}
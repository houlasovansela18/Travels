import { SMTPClient } from 'emailjs';
import error501 from '../utils/error501';
import Logger
 from '../utils/Logger';
import Status from '../utils/Status';
export default async (destiny : String, subject : String, text: String)=>{
    try{
        const client = new SMTPClient({
            user     : `${process.env.SMTP_USER}`,
            password : `${process.env.SMTP_PASSWORD}`,
            host     : `${process.env.SMTP_HOST}`,
            ssl      : true
        });

        await client.sendAsync({
            text    : `${text}`,
            from    : `${process.env.SMTP_USER}`,
            to      : `${destiny}`,
            subject : `${subject}`,
        });
        

        return {
            resultMessage :{
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage  : '',
                message : 'SUCCESS'
            },
            data : null
        }
    }
    catch(e){
       console.log(e)
       Logger("Cannot send email message!")
       return error501('')
    }

}
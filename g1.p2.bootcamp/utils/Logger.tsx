import fs from 'fs';

export default async (message:String)  =>{
    try {
        fs.writeFileSync('./logs/backend.log', `${message}`);
      } 
    catch (err) {
        console.error(err);
      }
}

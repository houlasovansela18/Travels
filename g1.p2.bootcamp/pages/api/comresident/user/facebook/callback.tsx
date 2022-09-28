import { NextApiRequest, NextApiResponse } from "next";
import passport  from "passport";
import handler from '../../../../../middleware/handler';
import '../../../../../config/passport/facebook';

handler
.use(passport.initialize())
.use(passport.authenticate('facebook', {scope: ["profile", "email"],session:false}))
.get(async ( req:NextApiRequest, res:NextApiResponse) => {
    res.redirect('http://localhost:3000/api/hello')
})

export default handler;
// let LogIn =  async ( req:NextApiRequest, res:NextApiResponse) => {

//     passport.authenticate('google', (err, user, info)=>{
//         console.log("user")
//         if(err || !user){
//             console.log('Fialed------------')
//             res.redirect('http://localhost:3000/api/hello')
//         }
    
//         console.log('successed===============')
//         return res.redirect('http://localhost:3000/api/hello')
//     })
// }

// export default LogIn;

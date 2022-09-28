import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import error501 from "../../utils/error501";
import connect from "../../config/db";
import Role from "../../utils/Role";
import Status from "../../utils/Status";
import Employee from "../../model/officers/employee/employee";
import IntStatus from "../../utils/IntStatus";

let createSuperAdmin = async (req:NextApiRequest, res:NextApiResponse)=>{
    
    try{
        
        await connect();
        let data = req.body;
        // hashing password
        let password = data.password;
            // hash password
        let hashPassword = await bcrypt.hash(password, 8);
        if(!hashPassword){
            let err =  error501('Error Hashing Password')
            return res.status(err.resultMessage.statusCode).send(err)
        }


        data.password = hashPassword;
        data.id       = 'superadmin';
        data.role     = Role.SuperAdmin;
        data.name     = 'superadmin';
        data.status    = IntStatus.SUCCESS;
        
        let resp   = await Employee.create(data);
        
        if(!resp){
            let err = error501('Cannot create User')
            return res.status(err.resultMessage.statusCode).send(err)
        }
        
        let su =  {
            resultMessage : {
                status : Status.SUCCESS,
                statusCode : 201,
                errorMessage : '',
                message : 'SUCCESS'
            },
            data : resp
        }
        return res.status(su.resultMessage.statusCode).send(su)
    }catch(e){
        let err = error501('Cannot create User')
        return res.status(err.resultMessage.statusCode).send(err)
    }

}

export default createSuperAdmin;
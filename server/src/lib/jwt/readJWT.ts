import { Request , Response, NextFunction} from "express";
import jwt_decode from "jwt-decode"
import getErrorMessage from "../functions/getErrorMessage";

const readJWT = (req : Request, res : Response, next : NextFunction) => {
    try{
        const jwt_token = req.cookies.jwt_token;
        const decoded = jwt_decode(jwt_token.split(" ")[1]);
        
        res.locals.userDetails = decoded;

        return next() 
    }catch(err){
        const message = getErrorMessage(err);
        return res.json({ status: 400, message: message });
    }
}

export default readJWT
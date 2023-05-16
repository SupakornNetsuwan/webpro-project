import { Request , Response, NextFunction} from "express";
import jwt_decode from "jwt-decode"
import getErrorMessage from "../../functions/getErrorMessage";

/**
 * 
 * @describe ทำหน้าที่ในการอ่าน JWT token ที่แนบมาใน cookie และเก็บเข้าไปใน res.locals.userDetails (การอ่านไม่เหมือนกับการ check เพราะมันไม่ทำอะไรแม้หมดอายุ)
 * 
 * @example
 * {
  email: 'earthrockgame@gmail.com',
  picture: 'https://lh3.googleusercontent.com/a/AGNmyxZpBELNVId5YcsShacTAXRmrkIrPU32i9i1hfAIhQ=s96-c',
  name: 'Supakorn Netsuwan',
  firstname: 'Supakorn',
  lastname: 'Netsuwan',
  iat: 1681123833,
  exp: 1681123848
}
 * 
 */
const readJWTMiddleware = (req : Request, res : Response, next : NextFunction) => {
    try{
        const jwt_token = req.cookies.jwt_token;
        const decoded = jwt_decode(jwt_token.split(" ")[1]);
        
        res.locals.userDetails = decoded;

        return next() 
    }catch(err){
        const message = getErrorMessage(err);
        return res.status(400).send(message );
    }
}

export default readJWTMiddleware
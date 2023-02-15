import jwt from "jsonwebtoken";
import { User, UserDetails } from "../types/user";

export const createAccessToken = (userDetails: UserDetails) : string => {
    const token = jwt.sign(userDetails, process.env.PRIVATEKEY as string, {
        expiresIn: "30s"
    });
    return "Bearer " + token
}

export const createRefreshToken = (userDetails: UserDetails) : string => {
    const token  = jwt.sign(userDetails, process.env.PRIVATEKEY2 as string, {
        expiresIn: "15min"
    });

    return "Bearer " + token;
}
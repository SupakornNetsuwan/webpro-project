import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const createAccessToken = ({ email, picture, name, firstname, lastname, ...options }: User): string => {
    const token = jwt.sign({ email, picture, name, firstname, lastname }, process.env.JWT_PRIVATEKEY as string, {
        expiresIn: "15s"
    });

    return "Bearer " + token
}

export const createRefreshToken = ({ email, picture, name, firstname, lastname, ...options }: User): string => {
    const token = jwt.sign({ email, picture, name, firstname, lastname }, process.env.REFRESHTOKEN_PRIVATEKEY as string, {
        expiresIn: "12h"
    });

    return "Bearer " + token;
}
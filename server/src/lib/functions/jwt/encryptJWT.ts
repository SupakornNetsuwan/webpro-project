import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

/**
 * 
 * @description สร้าง AccessToken สำหรับการเข้าสู่ระบบ
 * @returns Bearer token เป็น ```String```
 * 
 * @inteface```
 * {
 *  email: string
 *  picture: string
 *  name: string
 *  firstname: string
 *  lastname: string
 * }
 * ```
 */

export const createAccessToken = <T extends User>({ email, picture, name, firstname, lastname, role, ...options }: T): string => {
    const token = jwt.sign({ email, picture, name, firstname, lastname, role }, process.env.JWT_PRIVATEKEY as string, {
        expiresIn: "15s"
    });

    return "Bearer " + token
}

/**
 * 
 * @description สร้าง Refresh Token
 * @returns Bearer token สำหรับ Refresh Token เท่านั้น เป็น ```String```
 * 
 * @inteface```
 * {
 *  email: string
 *  picture: string
 *  name: string
 *  firstname: string
 *  lastname: string
 * }
 * ```
 */


export const createRefreshToken = <T extends User>({ email, picture, name, firstname, lastname, role, ...options }: T): string => {
    const token = jwt.sign({ email, picture, name, firstname, lastname, role }, process.env.REFRESHTOKEN_PRIVATEKEY as string, {
        expiresIn: "12h"
    });

    return "Bearer " + token;
}
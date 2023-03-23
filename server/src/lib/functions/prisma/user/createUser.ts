import prisma from "../../../connection/prisma";
import { User } from "@prisma/client";

// สร้างผู้ใช้ใหม่ โดยการที่เรารับข้อมูลของเขา และ Return ไปโดยที่มีการตัด Refresh token ที่เก็บใน DB 🌷
const createUser = async (email: string, picture: string, name: string, given_name: string, family_name: string) => {
    const newUser = await prisma.user.create({
        data: {
            email,
            picture,
            name,
            firstname: given_name,
            lastname: family_name
        } as User// Bug to fix later
    })

    const modifyUser = { ...newUser } as Partial<User>;
    delete modifyUser.refresh_token;

    return modifyUser as User;
}

export default createUser
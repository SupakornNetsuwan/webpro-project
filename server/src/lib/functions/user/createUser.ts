import prisma from "../../connection/prisma";
import { User } from "@prisma/client";

interface CreateUserProps {
    email: string,
    picture: string,
    name: string,
    given_name: string,
    family_name: string
}

/**
 * 
 * @description สร้างผู้ใช้ใหม่ โดยการที่เรารับข้อมูลของเขา และ Return ผู้ใช้คนนั้นออกมา
 */
const createUser = async (
    { email, picture, name, given_name, family_name }: CreateUserProps,
): Promise<User> => {
    
    let newUser = await prisma.user.create({
        data: {
            email,
            picture,
            name,
            firstname: given_name,
            lastname: family_name
        },
        select: {
            email: true,
            firstname: true,
            lastname: true,
            name: true,
            picture: true,
            role: true,
            created_date: true
        }
    })

    return newUser;
}

export default createUser
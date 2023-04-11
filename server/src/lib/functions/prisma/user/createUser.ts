import prisma from "../../../connection/prisma";
import { User } from "@prisma/client";

interface CreateUserProps {
    email: string,
    picture: string,
    name: string,
    given_name: string,
    family_name: string
}

interface CreateUserOptionProps {
    getRefreshToken: boolean
}

/**
 * 
 * @description สร้างผู้ใช้ใหม่ โดยการที่เรารับข้อมูลของเขา และ Return ผู้ใช้คนนั้นออกมา
 */
const createUser = async (
    { email, picture, name, given_name, family_name }: CreateUserProps,
    { getRefreshToken }: CreateUserOptionProps
): Promise<User> => {
    const newUser = await prisma.user.create({
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
            createdAt: true,
            refresh_token: getRefreshToken ? true : false
        }
    })

    return newUser;
}

export default createUser
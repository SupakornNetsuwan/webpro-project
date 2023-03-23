import prisma from "../../../connection/prisma";
import { User } from "@prisma/client";

const getUser = async (email: string, { getRefreshToken }: { getRefreshToken?: boolean }) => {

    const user = await prisma.user.findFirst({
        where: {
            email: email
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
    }) as User

    return user
}

export default getUser;
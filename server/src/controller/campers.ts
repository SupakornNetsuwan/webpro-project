import { Response, Request } from "express";
import prisma from "../lib/prisma";

export const getCampers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            firstname: true,
            lastname: true,
            email: true,
            nickname: true,
        }
    })

    res.json({ data : users})
}

export const getCamper = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    res.send({ message: "Hello " + id })

}
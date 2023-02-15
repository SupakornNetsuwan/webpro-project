import express, { Response, Request, NextFunction } from "express";
import { createAccessToken, createRefreshToken } from "../function/encryptJWT";
import { User, UserDetails } from "../types/user";
import jwt from "jsonwebtoken";
import pool from "../connect/connect";


export const signin = (req: Request, res: Response) => {
    const { username, password }: { username: string, password: string } = req.body;

    if (!username || !password) return res.json({ status: "error", message: "Username or password is missing" });

    // Search user if valid
    pool.query("SELECT * FROM users WHERE username = ? AND password = ? ", [username, password], (err, rows: any[], fields) => {
        if (err) return res.json({ status: "error", message: err.message }); // if any error
        if (rows.length === 0) return res.json({ status: "error", message: "Username or password is incorrect" }); // if password or username is incorrect


        const userDetails: UserDetails = {
            id: rows[0].id,
            username: rows[0].username,
            refreshToken: rows[0].refreshToken,
            nickname: rows[0].nickname,
            isAdmin: rows[0].isAdmin,
        }

        const accessToken = createAccessToken(userDetails);
        const refreshToken = createRefreshToken(userDetails);


        // Save latest refresh token
        pool.query("UPDATE users SET refreshtoken = ? WHERE id = ?", [refreshToken, rows[0].id], (err, rows, fields) => {
            if (err) return res.json({ status: "error", message: err.message });
        })

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    })

}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization as string;
    if (!authorization) return res.json({ status: "error", message: "No authorization header" })

    jwt.verify(authorization.split(" ")[1], process.env.PRIVATEKEY as string, (err, decoded) => {
        if (err) return res.json({ status: "error", message: err.message });

        console.log(decoded)

        res.locals.userDetails = decoded;
        next();
    })
}

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const { userid, refreshtoken }: { userid: number, accesstoken: string, refreshtoken: string } = req.body;

    if (!refreshtoken || !userid) return res.json({ status: "error", message: "No access token" })

    // search user from id
    pool.query("SELECT * FROM users WHERE id = ?", [userid], (err, rows: any[], fields) => {
        if (err) return res.json({ status: "error", message: err.message });

        // check if user has a valid refresh token with attached one
        if (rows[0].refreshtoken !== refreshtoken) {
            return res.json({
                status: "error", message: "Refresh token is not valid"
            })
        }

        // check if access token is valid
        jwt.verify(refreshtoken.split(" ")[1], process.env.PRIVATEKEY2 as string, (err, decoded) => {
            if (err) return res.json({ status: "error", message: err.message });

            const userDetails: UserDetails = {
                id: rows[0].id,
                username: rows[0].username,
                refreshToken: rows[0].refreshToken,
                nickname: rows[0].nickname,
                isAdmin: rows[0].isAdmin,
            }

            const accessToken = createAccessToken(userDetails);
            const refreshToken = createRefreshToken(userDetails);

            // Save a new refresh token
            pool.query("UPDATE users SET refreshtoken = ? WHERE id = ?", [refreshToken, rows[0].id], (err, rows, fields) => {
                if (err) return res.json({ status: "error", message: err.message });
            })

            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        })
    })

}

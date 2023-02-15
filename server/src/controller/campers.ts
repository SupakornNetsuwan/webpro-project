import { Response, Request } from "express";
import pool from "../connect/connect";

export const getCampers = (req: Request, res: Response) => {
    pool.query("SELECT * FROM campers", (err, rows, fields) => {
        if (err) return res.json({ status: "error", message: err.message });

        res.json({ status: "success", data: rows })
    })
}

export const getCamper = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const { populate } = req.query;

    if (isNaN(id)) return res.json({ status: "error", message: "ID must be a number" })

    if (populate === "camp_id") {
        pool.query("SELECT * FROM campers INNER JOIN camps ON campers.camp_id = camps.id WHERE campers.id = ?", [id], (err, rows, fields) => {
            if (err) return res.json({ status: "error", message: err.message });

            res.json({ status: "success", data: rows })
        })

    } else {
        pool.query("SELECT * FROM campers WHERE `id` = ?", [id], (err, rows, fields) => {
            if (err) return res.json({ status: "error", message: err.message });

            res.json({ status: "success", data: rows })
        })
    }

}
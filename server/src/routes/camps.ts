import express, { Response, Request } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send({
        books: [{ name: "King josh" }, { name: "Circle table" }, { name: "Basic tennis 101" }]
    })
})

export default app;
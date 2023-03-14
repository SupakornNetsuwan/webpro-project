import express, { Response, Request } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send({
        books: [{ name: "King josh" }, { name: "Earth table" }]
    })
})

export default app;
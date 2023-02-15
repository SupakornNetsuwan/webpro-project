import express, { Response, Request } from "express";
import { signin , refreshToken} from "../controller/authen";

const router = express.Router();
router.post("/signin", signin);
router.post("/refreshtoken", refreshToken);

export default router;
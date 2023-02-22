"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campers_1 = require("../controller/campers");
const router = express_1.default.Router();
// router.get("/", checkAuth, getCampers)
router.get("/", campers_1.getCampers);
router.get("/:id", campers_1.getCamper);
exports.default = router;

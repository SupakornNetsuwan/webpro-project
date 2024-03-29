"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* sub routes */
const campers_1 = __importDefault(require("./campers"));
const camps_1 = __importDefault(require("./camps"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});
router.use('/campers', campers_1.default);
router.use('/camps', camps_1.default);
exports.default = router;

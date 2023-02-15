"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* sub routes */
const users_1 = __importDefault(require("./users"));
const books_1 = __importDefault(require("./books"));
const router = express_1.default.Router();
router.use('/users', users_1.default);
router.use('/books', books_1.default);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCamper = exports.getCampers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getCampers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        select: {
            firstname: true,
            lastname: true,
            email: true,
            nickname: true,
        }
    });
    res.json({ data: users });
});
exports.getCampers = getCampers;
const getCamper = (req, res) => {
    const id = parseInt(req.params.id);
    res.send({ message: "Hello " + id });
};
exports.getCamper = getCamper;

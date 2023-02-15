"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send([{
            username: "PoomLNWZA",
            firstname: "phuttipong",
            lastname: "panich",
        }, {
            username: "Earth21",
            firstname: "Supakorn",
            lastname: "Netsuwan",
        }]);
});
app.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    res.send({ id, name: "EARTH" });
});
exports.default = app;

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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors = require("cors");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const PORT = 3001;
app.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in /user/create");
    console.log(req.body);
    try {
        const user = yield prisma.user.create({
            data: req.body,
        });
        console.log(user);
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/user/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in user/me");
    console.log("Request body:", req.body); // Log the request body
    try {
        const { email } = req.body; // Extract email from request body
        console.log("Extracted email:", email); // Log the extracted email
        // Ensure email is provided
        if (!email) {
            console.log("in !email");
            return res.status(400).json({ error: "Email is required" });
        }
        console.log("after email check");
        // Find the user by email
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        // Handle case where user is not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log(user);
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

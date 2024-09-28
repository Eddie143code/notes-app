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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_1 = require("../../utils/ping");
const userRouter = (0, express_1.Router)();
const prismaClient_1 = require("../../utils/prismaClient");
// Sign up
userRouter.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email already exists
        const existingUser = yield prismaClient_1.prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const user = yield prismaClient_1.prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while creating the user" });
    }
}));
// Sign in
userRouter.post("/user/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        // Find the user by email
        const user = yield prismaClient_1.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        // Handle case where user is not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.cookie("userEmail", user.email, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        console.log("succeed in me");
        return res.send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
userRouter.post("/user/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const email = yield (0, ping_1.verifyCookies)(cookies);
    return res.json(email);
}));
exports.default = userRouter;

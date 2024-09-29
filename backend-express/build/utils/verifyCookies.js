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
exports.verifyCookies = void 0;
const prismaClient_1 = require("./prismaClient");
const verifyCookies = (cookies) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = cookies.userEmail;
    if (!userEmail) {
        console.log("No user email found in cookies.");
        return false;
    }
    console.log("In verifyCookies: ", userEmail);
    try {
        const user = yield prismaClient_1.prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        if (!user) {
            console.log("No user with that email");
            return false;
        }
        return user;
    }
    catch (error) {
        console.error("Error while verifying user:", error);
        return false;
    }
});
exports.verifyCookies = verifyCookies;

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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session = require("express-session");
const cors = require("cors");
const verifyCookies_1 = require("./utils/verifyCookies");
const user_1 = __importDefault(require("./controllers/user/user"));
const note_1 = __importDefault(require("./controllers/note/note"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
}));
// app.use("/note", (req, res, next) => {
//   console.log("Note router reached");
//   next();
// });
// Router
app.use("/user", user_1.default);
app.use("/note", note_1.default);
app.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
const PORT = 3001;
// ping
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = (0, verifyCookies_1.verifyCookies)(req.cookies);
    if (!email)
        return res.status(404);
    console.log("someone pinged here");
    res.send("pong");
}));
// =============== AUTHENTICATION AND AUTHORIZATION ===============
// =============== NOTES ===============
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

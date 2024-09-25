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

const PORT = 3001;
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = verifyCookies(req.cookies);
    if (!email)
        return res.status(404);
    console.log("someone pinged here");
    res.send("pong");
}));
app.post('/user/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (existingUser) {
            // Return an error response if email is already taken
            return res.status(400).json({ error: 'Email already in use' });
        }
        // Create the new user
        const user = yield prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}));
// Example Express route with cookie handling
app.post("/user/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const email = verifyCookies(req.cookies);
    try {
        const { email } = req.body; // Extract email from request body
        console.log("Extracted email:", email); // Log the extracted email
        // Ensure email is provided
        if (!email) {
            console.log("in !email");
            return res.status(400).json({ error: "Email is required" });
        }
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
        // Set a cookie (e.g., user ID or session token)
        res.cookie('userEmail', user.email, {
            httpOnly: true, // Helps prevent cross-site scripting (XSS) attacks
            secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/user/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield verifyCookies(req.cookies);
    console.log('email: ' + JSON.stringify(email));
    console.log('in verify');
    return res.json(email);
}));
// Verify cookies function
const verifyCookies = (cookies) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = cookies;
    const user = yield prisma.user.findFirst({
        where: {
            email: userEmail,
        },
    });
    if (!user) {
        console.log('no user with that email');
        return false;
    }
    return user;
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

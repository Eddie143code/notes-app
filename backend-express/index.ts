import express from "express";
import cookieParser from "cookie-parser";
const session = require("express-session");
const cors = require("cors");

import { verifyCookies } from "./utils/ping";
import userRouter from "./controllers/user/user";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Update with your Next.js client URL
    credentials: true, // Allow cookies to be sent
  })
);

// Router
app.use(userRouter);

app.use(
  session({
    secret: "1234", // replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const PORT = 3001;

// ping
app.get("/ping", async (req, res: any) => {
  const email = verifyCookies(req.cookies);
  if (!email) return res.status(404);

  console.log("someone pinged here");
  res.send("pong");
});

// =============== AUTHENTICATION AND AUTHORIZATION ===============

// =============== NOTES ===============

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

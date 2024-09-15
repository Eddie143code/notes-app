import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from 'cookie-parser';
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000', // Update with your Next.js client URL
  credentials: true // Allow cookies to be sent
}));

const PORT = 3001;

app.get("/ping", async (req, res: any) => {
  const email = verifyCookies(req.cookies);
  if (!email) return res.status(404)

  console.log("someone pinged here");
  res.send("pong");
});

app.post('/user/create', async (req: any, res: any) => {
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      // Return an error response if email is already taken
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});


// Example Express route with cookie handling
app.post("/user/me", async (req, res: any) => {
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
    const user = await prisma.user.findFirst({
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
    return res.send()
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user/verify", async (req, res: any) => {
  const email = await verifyCookies(req.cookies);
  console.log('email: ' + JSON.stringify(email))
  console.log('in verify')
  return res.json(email)

})

// Verify cookies function
const verifyCookies = async (cookies: any) => {
  const { userEmail } = cookies

  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    console.log('no user with that email')
    return false;
  }

  return user;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

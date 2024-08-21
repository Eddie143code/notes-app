import express from "express";
import { PrismaClient } from "@prisma/client";
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.post("/user/create", async (req, res) => {
  console.log("in /user/create");
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user/me", async (req, res) => {
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
    const user = await prisma.user.findFirst({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

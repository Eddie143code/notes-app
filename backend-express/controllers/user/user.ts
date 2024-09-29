import { Router } from "express";
import { verifyCookies } from "../../utils/verifyCookies";

const userRouter = Router();
import { prisma } from "../../utils/prismaClient";

// Sign up
userRouter.post("/create", async (req: any, res: any) => {
  console.log("in note create");
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

// Sign in
userRouter.post("/me", async (req, res: any) => {
  try {
    const { email } = req.body;

    if (!email) {
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

    res.cookie("userEmail", user.email, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("succeed in me");
    return res.send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Verify
userRouter.post("/verify", async (req, res: any) => {
  const cookies = req.cookies;
  const email = await verifyCookies(cookies);

  return res.json(email);
});

export default userRouter;

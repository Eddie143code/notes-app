import { prisma } from "./prismaClient";

export const verifyCookies = async (cookies: any) => {
  const userEmail = cookies.userEmail;

  if (!userEmail) {
    console.log("No user email found in cookies.");
    return false;
  }

  console.log("In verifyCookies: ", userEmail);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      console.log("No user with that email");
      return false;
    }

    return user;
  } catch (error) {
    console.error("Error while verifying user:", error);
    return false;
  }
};

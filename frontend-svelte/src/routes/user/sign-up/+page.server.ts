import { type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log("in default");

    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:3000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await res.json();
      console.log(`res: ${response}`);

      if (res.ok) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: response.error || "An error occurred",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Internal server error",
      };
    }
  },
};

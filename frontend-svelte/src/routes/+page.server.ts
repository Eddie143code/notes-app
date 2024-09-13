import { json, redirect, type Actions } from "@sveltejs/kit";
import { userStore } from "../stores/user";
import { setContext } from "svelte";

export async function load({ cookies }) {
  const cookie = cookies.get("sessionid");
  if (cookie) {
    const payload = cookie;
    const res = await fetch("http://localhost:3000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const response = await res.json();
    return { response: response };
  }
}

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    console.log("in default");

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // console.log("response: " + JSON.stringify(response));
    // console.log("res: " + JSON.stringify(res));
    if (payload.email) {
      cookies.set("sessionid", JSON.stringify(payload), { path: "/" });
      // Navigate to /user/notes after successful login
      console.log("in res");
      return { success: true };
    }

    return {
      success: false,
    };
  },
};

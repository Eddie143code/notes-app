<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { getContext } from "svelte";
  import { userStore } from "../stores/user";
  export let data;
  const l = async () => {
    if (data?.response?.email) {
    }
  };
  $: console.log(data.response);
  $: l();
</script>

<div><h1>Sign in</h1></div>
<form class="flex flex-col gap-4" method="POST" use:enhance>
  <label class="input input-bordered flex items-center gap-2">
    Email
    <input type="text" name="email" class="grow" placeholder="daisy@site.com" />
  </label>
  <label class="input input-bordered flex items-center gap-2">
    Password
    <input type="password" name="password" class="grow" placeholder="Daisy" />
  </label>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<div><a href="/user/sign-up">Sign up</a></div>

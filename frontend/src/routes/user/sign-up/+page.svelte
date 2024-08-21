<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div><h1>Sign up</h1></div>
<form class="flex flex-col gap-4" method="POST" use:enhance>
  <label class="input input-bordered flex items-center gap-2">
    Email
    <input type="text" name="email" class="grow" placeholder="daisy@site.com" />
  </label>
  <label class="input input-bordered flex items-center gap-2">
    Password
    <input type="text" name="password" class="grow" placeholder="Daisy" />
  </label>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

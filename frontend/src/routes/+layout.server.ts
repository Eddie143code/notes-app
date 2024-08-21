/** @type {import('./$types').LayoutServerLoad} */ export async function load({
  cookies,
}) {
  const sessionid = cookies.get("sessionid");
  return { user: sessionid };
}

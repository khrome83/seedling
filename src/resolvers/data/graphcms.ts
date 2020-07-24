import graphcms from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-graphcms/master/mod.ts";

const host = `https://${Deno.env.get("HOST")}${Deno.env.get("PATH")}`;

export default graphcms(host, Deno.env.get("TOKEN") as string);

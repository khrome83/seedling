import graphcms from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-graphcms/master/mod.ts";

export default graphcms(
  Deno.env.get("HOST") as string,
  Deno.env.get("TOKEN") as string
);

import graphcms from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-graphcms/master/mod.ts";

const host = `https://${Deno.env.get("GRAPH_HOST")}${
  Deno.env.get(
    "GRAPH_PATH",
  )
}`;

export default graphcms(host, Deno.env.get("GRAPH_TOKEN") as string);

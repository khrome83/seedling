# Pages

Pages can be created with any `*.html` or `*.seed` file.

## Basic Routing

Pages by default, will use there directory structure, and file name as the route. This is great for small proofs of concepts, small sites, or just getting started. But in the example below, you can see how it can get repetitive. Espically when you start using data from other sources.

For example, this site not only has a blog, but has pagination of the blog entries. It also has tag pages, that show articles with specific tags, that also have there own pagination.

```python
/pages/index.html                               #   /
/pages/about-us.html                            #   /about-us
/pages/blog.html                                #   /blog
/pages/blog/page/2.html                         #   /blog/page/2
/pages/blog/page/3.html                         #   /blog/page/3
/pages/blog/how-to-use-seedling.html            #   /blog/how-to-use-seedling
/pages/blog/how-deno-works.html                 #   /blog/how-deno-works
/pages/blog/tag/deno.html                       #   /blog/tag/deno
/pages/blog/tag/deno/page/2.html                #   /blog/tag/deno/page/2
/pages/blog/tag/deno/page/3.html                #   /blog/tag/deno/page/3
/pages/blog/tag/seedling.html                   #   /blog/tag/seedling
/pages/blog/tag/seedling/page/2.html            #   /blog/tag/seedling/page/2
/pages/blog/tag/seedling/page/3.html            #   /blog/tag/seedling/page/3
```

## The Router Directive

The example above can be cleaned up a lot, by using a `<:router>` directive. Unlike other static site generators, Seedling opts for a more declaritive approach, that can reduce the amount of work on the developer. Let's rebuild the example above, with the assumption we are getting data from a data plugin.

> Note - This is a optional feature, you opt-into it. Any page without a `<:router>` directive, defaults to using the folder structure.

Our new structure only needs a few files to do the same work. We don't need a `<:router>` directive for every file. In this case the `index.html` and `about-us.html` pages are not the same structure, and we left them alone.

```python
/pages/index.html                               #   /

/pages/about-us.html                            #   /about-us

/pages/blog-article.html                        #   /blog/how-to-use-seedling
                                                #   /blog/how-deno-works

/pages/blog.html                                #   /blog
                                                #   /blog/page/2
                                                #   /blog/page/3
                                                #   /blog/tag/deno
                                                #   /blog/tag/deno/page/2
                                                #   /blog/tag/deno/page/3
                                                #   /blog/tag/seedling
                                                #   /blog/tag/seedling/page/2
                                                #   /blog/tag/seedling/page/3
```

### Dynamic Route

To use dynamic routes, we need to retrieve the data needed to power that route. We can do this by placing a `<:data>` directive before our `<:path>` directive that defines the blog article pages. In this case, the `<:data>` directive returns an array of strings for at the key `slugs`.

**Example Data Response**

```JSON
{
  "slugs": ["how-to-use-seedling", "how-deno-works"]
}
```

**/pages/blog-article.html**

```html
<:router>
  <:data use="getSlugs" />
  <:path url="/blog/:slugs" />
</:router>
<:data use="getArticle" slug={$params.slugs} />
```

The slug that was used for this instance of the page, would be available as `$params.slugs`. Any dyanmic part of a route, will be available under `$params` during the rendering the page. This cans be passed into additional `<:data>` directives to get data specific for this page.

Any calls with a `<:data>` directive is scoped to that instance of the page. This means "getArticle" will return data that is unique for the slug passed in.

### Blog Index with Pagination

This page will be more complex, but will handle the bulk of the blog. Everything but an individual article.

This will handle the blog index, the index for the tags, and any pagination for either. This is the prime example where folder based routing systems can get a little large.

First we have our `<:router>` for the `blog-article.html` page.

**/pages/blog.html**

```html
<:router>
  <:data use="getTags" />
  <:data use="getArticles" />
  <:path url="/blog" />
  <:path url="/blog/page/:#page">
    <:data use="pagination" page={$params.page}>
  </:path>
  <:path url="/blog/tag/:tag" />
  <:path url="/blog/tag/:tag/:pagination" />
</:router>

```

The thing that is really new here, is the `:#page` segment with the `url` attribute of the `<:path>` directive. Pagination segments require a `<:data>` directive within the `<:path>` directive as a child. This data plugin is then called during the compiling of routes. It starts with `0` and increments by `1` every request, passing that information to `$params.page`. The data plugin, can then decide to `skip`, and `end` that path.

For example, the data plugin below, calls `response.skip` on `0` & `1`, because we do not want those routes. But we do want future routes. On `2` and `3`, success is returned, because we want that content. When we get above `3`, we call `response.end` because we do not want that route, or any future routes.

While this is a overly simple example, this could just as easily be a call to a database for more entires. When no more entires are found, `response.end` will be called.

**/data/pagination.ts**

```ts
import {
  Request,
  Response,
} from "https://raw.githubusercontent.com/use-seedling/seedling/master/mod.ts";

interface Pagination {
  page: string;
}

export default async (request: Request, response: Response) => {
  const { page } = (request.attrs as unknown) as Pagination;

  switch (page) {
    case "0":
    case "1":
      return response.skip({ page });
    case "2":
    case "3":
      return response.success({ page });
    default:
      return response.end({ page });
  }
};
```

> Note - The pagination segment is the most expensive path segment to compute. It also typically uses network or database calls to determine what to do. It is ideal in situations where you can not determine the range of pagination ahead of time. But it does slow down the compiling of the site, and can have negative impacts on the startup / refresh of routes on the dev server. Use the range path segment when you can predetermine the number of pages. Example `/blog/page/:[1,2]page`.

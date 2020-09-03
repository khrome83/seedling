# Consuming Data with Data Plugins

Seedling has a really forgiving data model that scopes data to the route, page, component, and layout it was initatited from. It is then instantly avaialable to use within the markup the follows the data retrievial.

A example call with Seedling to fetch data looks like this -

```html
<:data use="Identifier" id="asd898124asd">
```

The `Identifier` above should match the name of a `.ts` or `.js` file within this folder.

```
/data/Identifier.ts
```

## Example Data Plugin

```ts
// Import the Request and Response type for Typescript
import {
  Request,
  Response,
} from "https://raw.githubusercontent.com/use-seedling/seedling/master/mod.ts";

interface Identifier {
  id: string;
}

export default async (request: Request, response: Response) => {
  const { id } = (request.attrs as unknown) as Pagination;

  try {
    const data = (await fetch(`https://path.to.services.com/id/${id}`)).json();
    response.sucess(data);
  } catch (e) {
    response.error(e);
  }
};
```

Information from the data call is available through `request.attrs` and `request.body`.

The data processing method can then deciode how to handle that inforamtion. Including making calls to the filesystem, databases, or caches. In this example, if the request is succesful, we pass bad `response.success`, else `reponse.error`.

## Third Party Plugins

Because of how `Deno` works with it's URL resolution model. Third party plugins do not require a package manager. For example, below installs a JSON data plugin that allows JSON to be consumed inline, via a file, or from a URL.

### /data/JSON.ts

```ts
import json from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-json/master/mod.ts";
export default json;
```

This plugin can now be used several ways

### As raw inline JSON

```html
  <:data use="json">
    {
      "key": "value"
    }
  </:data>
```

### From a local file

```html
<:data use="json" file="path/to/json/file.json" />
```

> **Note** - This plugin requires the `--allow-read` command line parameter for Deno when using file attribute.

### From a remote url

```html
<:data use="json" url="https://example.com/path/to/file.json" />
```

## Using Data

```html
  <:data use="json">
    {
      "key": "value"
    }
  </:data>

  <div>{key}</div>
```

More info on using Data Plugins can be found at https://seedling.dev/docs/#data

# Congrats!

You just created a Seedling project!

## File Structure

Here is the basic lay of the land that was created for you.

```py
/components                 # Your components will go into this folder. They can be either .html or .seed files.

/data                       # You functions to fetch data will go here.

/layouts                    # Any layouts to fetch

/pages                      # Your page defintions go here. This is the entry point for every page that is created.

/static                     # Any static assets go here. Seedling will not process them.

.gitignore                  # This keeps you safe ensuring you don't commit things you don't want too.

README.md                   # The file you are looking at! All directories have one to help guide you.

seedling.config.json        # This is the configuration file to customize the behavior of Seedling.

template.html               # This is the base HTML file that all pages share. More advanced users can touch this.
```

In addition to these files, a README.md file was added to every directory for a more indept explaination. You can also visit https://seedling.dev/docs for more information.

## Next Steps

You should spin up a development server to start building.

```bash
seed dev
```

This runs a blazing fast server that comes complete with on-the-fly compiling. There is never a wait for pre-bundling of a Seedling project. The server is smart enough to cache incremental pieces, and clear the cache as the file changes. Seedling's dev server should stay fast, no matter the size and complexity of your application.

### Styling

Seedling uses a custom Tailwind CSS processor to automatically generate classes on the fly. This means that you are not restricted to sizes defined in tailwindcss.com, and you do not need to enable any psudo elements. Everything just works out of the box. This includes the `prose` and the `form` plugin. As well as any feature needed for `tailwindui.com` components.

> Note - Tailwind UI uses a different color pallet than tailwindcss.com. It includes a `-50` and a extra gray range. You can set this in your configuration file.

### JavaScript

Seedling uses AlpineJS for interactions on the client. It does not do reactivity in itself, keeping a clear seperation of creating rendered HTML, vs client side interactions. Seedling also bundles Turbolinks to create a seamless navigation from page to page.

## Finally

When you are ready to deploy, it is as easy as running

```bash
seed build
```

I can't wait to see what you build with this!

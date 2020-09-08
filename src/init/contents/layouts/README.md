# Layouts

Layouts are used for reusable elements that wrap a page. They can be stacked with other layouts as well.

## Using a Layout

```html
<:layout use="Main" />
```

This would call a layout that is defined as `Main.html` or `Main.seed` in the `/layouts` directory.

Just like components, props can be passed to a layout. Layouts are only valid within a Page, and cannot be used within a Component or another Layout.

### /page/index.html

```html
<:router>
  <:path url="/"/>
</:router>

<:layout use="Main" />

<div> Page Contents </div>
```

## Creating a Layout

Create a new `*.html` or `*.seed` file within the layout directory.

Add any content you want for the layout.

Ensure a single `<:slot />` directive exists. Unline components, layouts can not have named slots. The page will be injected into the single slot within this layout.

## Stacking Layouts

Layouts can only be used within a Page. While layouts can be placed anywhere at the top level of a page, we recommend placing them after the `<:router>`. Layouts are optional, but allow for creating navigation that is consistatn across sections of your sites. In a more complex example than above, you could have your layout content broken out into seperate pieces.

For example, maybe you want to use the Primary navigation, a Secondary navigation, and a thick Footer.

In another section of the site, you may not need the secondary navigation, or may want to use a thinner footer. The customaization is up to you, and Seedling does not make any assumptions.

### /page/index.html

```html
<:router>
  <:path url="/"/>
</:router>

<:layout use="Primary" />
<:layout use="Secondary" />
<:layout use="ThickFooter" />

<div> Page Contents </div>
```

In the example above, the page will be rendered first without any layouts. The contents will be placed within the `ThickFooter` layout, then those contens will be placed within the `Secondary` layout, on up the stack. Layouts are always applied in reverse order. Since each layout has it's own `<:slot />` directive, each slot will contain the contents of the page, and layouts before it.

### /layouts/Primary.html

```html
<header class="primary">...</header>
<:slot />
```

### /layouts/Secondary.html

```html
<nav class="secondary">...</nav>
<:slot />
```

### /layouts/ThickFooter.html

```html
<:slot />
<footer class="footer">...</footer>
```

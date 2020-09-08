# Components

Components go here, they are used to make code reusable and composable.

## Example Component

1. Create a new file called `Hero.html` or `Hero.seed`.

2. Add code to your component.

```html
<div class="p-4">{name}</div>
```

3. Use it within any `Page`, `Layout`, or other `Components`.

```html
<Hero name="Spiderman" />
```

You can also use the longer format of the component directive. This is very useful when you need to dynamic define the component.

```html
<:component use="Hero" name="Spiderman" />
```

This is powerfull to allow dynamic passing of props and component definitions.

```html
<:component use={__typename} {...data} />
```

## Slots

Components can also have slots, similar to other popular frameworks like `Vue` and `Svelte`. Using a `<:slot>` tells the compiler where to insert the content from the component directive. In the example below `<Example>` component passes "Hello!" into the slot. Slots can also have a default value by having them populated within the component itself.

**/components/Example.html**

```html
<div class="p-4">
  <:slot />
  <strong>&nbsp;World</string>
</div>
```

**/poge/index.html**

```html
<Example> Hello! </Example>
```

**Final Output**

```html
<div class="p-4">
  Hello
  <strong>&nbsp;World</string>
</div>
```

## Named Slots

Slots can also be named. This is useful when you want to specify specific areas.

**/components/OrderSandwich.html**

```html
<div class="p-4">
  <:slot name="bread">White</:slot>
  <:slot name="jelly">Grape</:slot>
  <:slot name="butter">Peanut</:slot>
  <:slot name="plate">Paper</:slot>
</div>
```

**/poge/index.html**

```html
<OrderSandwich>
  <div slot="bread" class="bg-brown-200">Wheat</div>
  <div slot="helloy" class="bg-red-200">Strawberry</div>
  <div slot="butter" class="bg-brown-600">Almond</div>
</OrderSandwich>
```

**Final Output**

```html
<div class="p-4">
  <div class="bg-brown-200">Wheat</div>
  <div class="bg-red-200">Strawberry</div>
  <div class="bg-brown-600">Almond</div>
  Paper
</div>
```

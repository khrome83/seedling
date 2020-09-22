# seedling

![CI](<https://github.com/use-seedling/seedling/workflows/CI%20(PULL%20REQUEST)/badge.svg>)

[![Seedling](https://img.shields.io/badge/available%20on-deno.land/x-orange.svg?style=for-the-badge&logo=deno&labelColor=black)](https://deno.land/x/seedling)

Seedling is currently pre-alpha. This document will be updated as we finish more features.

`deno install --unstable --allow-read --allow-write --allow-env --allow-net --allow-hrtime --allow-run -f -n seed https://deno.land/x/seedling@0.0.3/cli.ts`

Run `seed help` for list of commands.

> Note - `seed build` and `seed upgrade` are not implimented yet.

## VS Code Plugin

Currently only offers basic syntax highligting.

https://marketplace.visualstudio.com/items?itemName=Seedling.seedling

## Fish

Need to set .deno/bin in fish to the path

###### ~/.config/fish/config.fish

```
set -gx PATH $HOME/.deno/bin $PATH
```

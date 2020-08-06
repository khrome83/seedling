import { assert, assertEquals, denock } from "../deps.ts";
import "https://deno.land/x/dotenv@v0.5.0/load.ts";
import { resolveData } from "./data.ts";
import { resolveComponent } from "./component.ts";
import { resolveLayout } from "./layout.ts";

Deno.test("Data Resolver - GraphCMS", async () => {
  const attrs = {
    id: "cka5lzgxk02s701761t7scrb0",
  };

  const body = `query MyQuery($id: ID) {
    marketingSocialProof(where: {id: $id}) {
      __typename
      id
    }
  }`;

  denock({
    method: "POST",
    protocol: "https",
    host: Deno.env.get("GRAPH_HOST") as string,
    headers: [
      { header: "content-type", value: "application/json" },
      {
        header: "authorization",
        value: `Bearer ${Deno.env.get("GRAPH_TOKEN")}`,
      },
    ],
    path: Deno.env.get("GRAPH_PATH") as string,
    requestBody: {
      operationName: "MyQuery",
      query: body,
      variables: attrs,
    },
    replyStatus: 200,
    responseBody: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
  });

  const output = await resolveData("graphcms", attrs, body);
  const expected = {
    type: "SUCCESS",
    response: {
      marketingSocialProof: {
        __typename: "MarketingSocialProof",
        id: "cka5lzgxk02s701761t7scrb0",
      },
    },
    retries: 0,
    meta: { cacheHit: false, cacheKey: "78c11c24-062e-5fff-b00b-5ae5fdddfa5e" },
  };

  assertEquals(output, expected);
});

Deno.test("Data Resolver with Key - GraphCMS", async () => {
  const attrs = {
    id: "cka5lzgxk02s701761t7scrb0",
  };

  const body = `query MyQuery($id: ID) {
    marketingSocialProof(where: {id: $id}) {
      __typename
      id
    }
  }`;

  denock({
    method: "POST",
    protocol: "https",
    host: Deno.env.get("GRAPH_HOST") as string,
    headers: [
      { header: "content-type", value: "application/json" },
      {
        header: "authorization",
        value: `Bearer ${Deno.env.get("GRAPH_TOKEN")}`,
      },
    ],
    path: Deno.env.get("GRAPH_PATH") as string,
    requestBody: {
      operationName: "MyQuery",
      query: body,
      variables: attrs,
    },
    replyStatus: 200,
    responseBody: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
  });

  const output = await resolveData("graphcms", attrs, body);
  const expected = {
    type: "SUCCESS",
    response: {
      marketingSocialProof: {
        __typename: "MarketingSocialProof",
        id: "cka5lzgxk02s701761t7scrb0",
      },
    },
    retries: 0,
    meta: { cacheHit: true, cacheKey: "78c11c24-062e-5fff-b00b-5ae5fdddfa5e" },
  };

  assertEquals(output, expected);
});

Deno.test("Component Resolver - Sample (local)", async () => {
  const output = await resolveComponent("Sample");
  const expected = {
    ast: {
      html: [
        {
          type: "Tag",
          data: "div",
          attributes: [
            {
              type: "Attribute",
              data: ' class="foo bar"',
              start: 4,
              end: 20,
              name: { type: "AttributeName", data: "class", start: 5, end: 10 },
              value: {
                type: "AttributeValue",
                data: "foo bar",
                start: 12,
                end: 21,
              },
            },
          ],
          children: [
            { type: "Text", data: "\n  ", start: 21, end: 24 },
            {
              type: "Tag",
              data: "ul",
              attributes: [],
              children: [
                { type: "Text", data: "\n    ", start: 28, end: 33 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Foo", start: 37, end: 40 }],
                  slot: undefined,
                  start: 33,
                  end: 45,
                },
                { type: "Text", data: "\n    ", start: 45, end: 50 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Bar", start: 54, end: 57 }],
                  slot: undefined,
                  start: 50,
                  end: 62,
                },
                { type: "Text", data: "\n    ", start: 62, end: 67 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Baz", start: 71, end: 74 }],
                  slot: undefined,
                  start: 67,
                  end: 79,
                },
                { type: "Text", data: "\n  ", start: 79, end: 82 },
              ],
              slot: undefined,
              start: 24,
              end: 87,
            },
            { type: "Text", data: "\n", start: 87, end: 88 },
          ],
          slot: undefined,
          start: 0,
          end: 94,
        },
      ],
      layout: [],
      router: undefined,
    },
    meta: { cacheHit: false, cacheKey: "300bb306-697d-5d85-80ff-b28ec2feb524" },
  };

  assertEquals(output, expected);
});

Deno.test("Component Resolver - BaseHeading (local)", async () => {
  const output = await resolveComponent("BaseHeading");
  const expected = {
    ast: {
      html: [
        {
          type: "WhenBlock",
          data: ":when",
          children: [
            { type: "Text", data: "\n  ", start: 13, end: 16 },
            {
              type: "IsBlock",
              data: ":is",
              children: [
                { type: "Text", data: "\n    ", start: 25, end: 30 },
                {
                  type: "Tag",
                  data: "h1",
                  attributes: [],
                  children: [
                    {
                      type: "SlotDirective",
                      data: ":slot",
                      expression: undefined,
                      attributes: [],
                      children: [],
                      start: 34,
                      end: 42,
                    },
                  ],
                  slot: undefined,
                  start: 30,
                  end: 47,
                },
                { type: "Text", data: "\n  ", start: 47, end: 50 },
              ],
              expression: {
                type: "Literal",
                data: '"1"',
                value: "1",
                start: 21,
                end: 24,
              },
              start: 16,
              end: 50,
            },
            {
              type: "IsBlock",
              data: ":is",
              children: [
                { type: "Text", data: "\n    ", start: 59, end: 64 },
                {
                  type: "Tag",
                  data: "h2",
                  attributes: [],
                  children: [
                    {
                      type: "SlotDirective",
                      data: ":slot",
                      expression: undefined,
                      attributes: [],
                      children: [],
                      start: 68,
                      end: 76,
                    },
                  ],
                  slot: undefined,
                  start: 64,
                  end: 81,
                },
                { type: "Text", data: "\n  ", start: 81, end: 84 },
              ],
              expression: {
                type: "Literal",
                data: '"2"',
                value: "2",
                start: 55,
                end: 58,
              },
              start: 50,
              end: 84,
            },
            {
              type: "IsBlock",
              data: ":is",
              children: [
                { type: "Text", data: "\n    ", start: 93, end: 98 },
                {
                  type: "Tag",
                  data: "h3",
                  attributes: [],
                  children: [
                    {
                      type: "SlotDirective",
                      data: ":slot",
                      expression: undefined,
                      attributes: [],
                      children: [],
                      start: 102,
                      end: 110,
                    },
                  ],
                  slot: undefined,
                  start: 98,
                  end: 115,
                },
                { type: "Text", data: "\n  ", start: 115, end: 118 },
              ],
              expression: {
                type: "Literal",
                data: '"3"',
                value: "3",
                start: 89,
                end: 92,
              },
              start: 84,
              end: 118,
            },
            {
              type: "IsBlock",
              data: ":is",
              children: [
                { type: "Text", data: "\n    ", start: 127, end: 132 },
                {
                  type: "Tag",
                  data: "h4",
                  attributes: [],
                  children: [
                    {
                      type: "SlotDirective",
                      data: ":slot",
                      expression: undefined,
                      attributes: [],
                      children: [],
                      start: 136,
                      end: 144,
                    },
                  ],
                  slot: undefined,
                  start: 132,
                  end: 149,
                },
                { type: "Text", data: "\n  ", start: 149, end: 152 },
              ],
              expression: {
                type: "Literal",
                data: '"4"',
                value: "4",
                start: 123,
                end: 126,
              },
              start: 118,
              end: 152,
            },
            {
              type: "ElseBlock",
              data: ":else",
              children: [
                { type: "Text", data: "\n    ", start: 159, end: 164 },
                {
                  type: "Tag",
                  data: "div",
                  attributes: [],
                  children: [
                    {
                      type: "SlotDirective",
                      data: ":slot",
                      expression: undefined,
                      attributes: [],
                      children: [],
                      start: 169,
                      end: 177,
                    },
                  ],
                  slot: undefined,
                  start: 164,
                  end: 183,
                },
                { type: "Text", data: "\n", start: 183, end: 184 },
              ],
              start: 152,
              end: 184,
            },
          ],
          expression: { type: "Identifier", data: "level", start: 7, end: 12 },
          start: 0,
          end: 192,
        },
      ],
      layout: [],
      router: undefined,
    },
    meta: { cacheHit: false, cacheKey: "f98a66e8-4f3a-5ba6-bea8-0e1b711ef6b8" },
  };

  assertEquals(output, expected);
});

Deno.test("Component Resolver - Hero (remote)", async () => {
  denock({
    method: "GET",
    protocol: "https",
    host: "raw.githubusercontent.com",
    path: "/use-seedling/seedling-component-masthead/master/index.html",
    replyStatus: 200,
    responseBody: `<!-- This sample comes from tailwindui.com -->
    <!-- https://tailwindui.com/components/marketing/sections/heroes -->
    <div class="relative bg-white overflow-hidden" x-data="{ open: false }">
      <div class="max-w-screen-xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
    
          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div class="flex items-center justify-between w-full md:w-auto">
                  <a href="#" aria-label="Home">
                    <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Logo">
                  </a>
                  <div class="-mr-2 flex items-center md:hidden">
                    <button @click="open = true" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                      <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="hidden md:block md:ml-10 md:pr-4">
                <a href="#" class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Product</a>
                <a href="#" class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Features</a>
                <a href="#" class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Marketplace</a>
                <a href="#" class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Company</a>
                <a href="#" class="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">Log in</a>
              </div>
            </nav>
          </div>
    
          <!-- Mobile menu, show/hide based on menu open state. -->
          <div x-show.transition.in.duration.150ms.out.duration.100ms="open" @click.away="open = false" solute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div class="rounded-lg shadow-md">
              <div class="rounded-lg bg-white shadow-xs overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                <div class="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="">
                  </div>
                  <div class="-mr-2">
                    <button @click="open = false" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Close menu">
                      <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="px-2 pt-2 pb-3">
                  <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Product</a>
                  <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Features</a>
                  <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Marketplace</a>
                  <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Company</a>
                </div>
                <div>
                  <a href="#" class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out" role="menuitem">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
    
          <main class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Data to enrich your
                <br class="xl:hidden">
                <span class="text-indigo-600">online business</span>
              </h2>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Get started
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="">
      </div>
    </div>
    `,
  });

  const output = await resolveComponent("Hero");
  assert(!!output.ast.html); // Cast to boolean and assert, we need true
});

Deno.test("Layout Resolver - Default (local)", async () => {
  const output = await resolveLayout("Default");
  const expected = {
    ast: {
      html: [
        {
          type: "Tag",
          data: "div",
          attributes: [],
          children: [
            { type: "Text", data: "\n  ", start: 5, end: 8 },
            {
              type: "SlotDirective",
              data: ":slot",
              attributes: [],
              children: [],
              expression: undefined,
              start: 8,
              end: 23,
            },
            { type: "Text", data: "\n", start: 23, end: 24 },
          ],
          slot: undefined,
          start: 0,
          end: 30,
        },
      ],
      router: undefined,
      layout: [],
    },
    meta: { cacheHit: false, cacheKey: "d0d1aade-a374-590f-8b22-4a8bb02e45be" },
  };

  assertEquals(output, expected);
});

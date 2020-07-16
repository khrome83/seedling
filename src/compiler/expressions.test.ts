// import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
// import { Compiler } from "./index.ts";

// Deno.test("Identifier", () => {
//   const ast = {
//     html: [
//       { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
//       { type: "Identifier", data: "foobar", start: 26, end: 32 },
//       { type: "Text", data: " should be a Indetifier.", start: 34, end: 58 },
//     ],
//   };
//   const data = {
//     foobar: "barfoo",
//   };

//   const c = new Compiler(ast, data);
//   const output = c.compile();
//   const expected = {
//     html: [
//       { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
//       { type: "Text", data: "barfoo", start: 26, end: 32 },
//       { type: "Text", data: " should be a Indetifier.", start: 34, end: 58 },
//     ],
//   };

//   assertEquals(output, expected);
// });

// Deno.test("Chained Identfier", () => {
//   const ast = {
//     html: [
//       { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
//       {
//         type: "MemberExpression",
//         data: "foo.bar",
//         object: { type: "Identifier", data: "foo", start: 26, end: 29 },
//         property: { type: "Identifier", data: "bar", start: 30, end: 33 },
//         start: 26,
//         end: 33,
//       },
//       {
//         type: "Text",
//         data: " should be a Indetifier. It can be ",
//         start: 35,
//         end: 70,
//       },
//       {
//         type: "MemberExpression",
//         data: "nested.as[0].many.times",
//         object: {
//           type: "MemberExpression",
//           data: "nested.as[0].many",
//           object: {
//             type: "MemberExpression",
//             data: "nested.as[0]",
//             object: {
//               type: "MemberExpression",
//               data: "nested.as",
//               object: {
//                 type: "Identifier",
//                 data: "nested",
//                 start: 72,
//                 end: 78,
//               },
//               property: { type: "Identifier", data: "as", start: 79, end: 81 },
//               start: 72,
//               end: 81,
//             },
//             property: {
//               type: "Literal",
//               data: "0",
//               value: 0,
//               start: 82,
//               end: 83,
//             },
//             start: 71,
//             end: 83,
//           },
//           property: { type: "Identifier", data: "many", start: 85, end: 89 },
//           start: 71,
//           end: 89,
//         },
//         property: { type: "Identifier", data: "times", start: 90, end: 95 },
//         start: 71,
//         end: 95,
//       },
//       { type: "Text", data: " and also ", start: 97, end: 107 },
//       {
//         type: "MemberExpression",
//         data: "resolved[0]",
//         object: { type: "Identifier", data: "resolved", start: 108, end: 116 },
//         property: {
//           type: "Literal",
//           data: "0",
//           value: 0,
//           start: 117,
//           end: 118,
//         },
//         start: 108,
//         end: 118,
//       },
//       { type: "Text", data: ".", start: 120, end: 121 },
//     ],
//   };
//   const data = {
//     foo: {
//       bar: "barfoo",
//       nested: {
//         as: [
//           {
//             many: {
//               times: "10x",
//             },
//           },
//           {
//             few: {
//               times: "0x",
//             },
//           },
//         ],
//         trap: false,
//       },
//       resolved: ["Testing"],
//     },
//   };

//   const c = new Compiler(ast, data);
//   const output = c.compile();
//   const expected = {
//     html: [
//       { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
//       { type: "Text", data: "barfoo", start: 26, end: 33 },
//       {
//         type: "Text",
//         data: " should be a Indetifier. It can be ",
//         start: 35,
//         end: 70,
//       },
//       { type: "Text", data: "10x", start: 71, end: 95 },
//       { type: "Text", data: " and also ", start: 97, end: 107 },
//       { type: "Text", data: "Testing", start: 108, end: 118 },
//       { type: "Text", data: ".", start: 120, end: 121 },
//     ],
//   };

//   assertEquals(output, expected);
// });

// Deno.test("Literal", () => {
//   const ast = {
//     html: [
//       { type: "Text", data: "This is ", start: 0, end: 8 },
//       { type: "Literal", data: "4", value: 4, start: 9, end: 10 },
//       { type: "Text", data: " to ", start: 11, end: 15 },
//       { type: "Literal", data: "4.5", value: 4.5, start: 16, end: 19 },
//       { type: "Text", data: " times more likely to ", start: 20, end: 42 },
//       { type: "Literal", data: "'work'", value: "'work'", start: 43, end: 49 },
//       { type: "Text", data: " when we enable it ", start: 50, end: 69 },
//       { type: "Literal", data: "true", value: true, start: 70, end: 74 },
//       { type: "Text", data: ".", start: 75, end: 76 },
//     ],
//   };
//   const data = {};

//   const c = new Compiler(ast, data);
//   const output = c.compile();
//   const expected = {
//     html: [
//       { type: "Text", data: "This is ", start: 0, end: 8 },
//       { type: "Text", data: "4", start: 9, end: 10 },
//       { type: "Text", data: " to ", start: 11, end: 15 },
//       { type: "Text", data: "4.5", start: 16, end: 19 },
//       { type: "Text", data: " times more likely to ", start: 20, end: 42 },
//       { type: "Text", data: "'work'", start: 43, end: 49 },
//       { type: "Text", data: " when we enable it ", start: 50, end: 69 },
//       { type: "Text", data: "true", start: 70, end: 74 },
//       { type: "Text", data: ".", start: 75, end: 76 },
//     ],
//   };

//   assertEquals(output, expected);
// });

// Deno.test("Attribute Identifier and Literal", () => {
//   const ast = {
//     html: [
//       {
//         type: "ComponentDirective",
//         data: ":component",
//         attributes: [
//           {
//             type: "Attribute",
//             data: ' lat="{lat}"',
//             start: 4,
//             end: 16,
//             name: { data: "lat", start: 5, end: 8 },
//             value: {
//               type: "ExpressionAttribute",
//               data: "{lat}",
//               expression: {
//                 type: "Identifier",
//                 data: "lat",
//                 start: 11,
//                 end: 14,
//               },
//               start: 10,
//               end: 15,
//             },
//           },
//           {
//             type: "Attribute",
//             data: ' lng="{lng}"',
//             start: 16,
//             end: 28,
//             name: { data: "lng", start: 17, end: 20 },
//             value: {
//               type: "ExpressionAttribute",
//               data: "{lng}",
//               expression: {
//                 type: "Identifier",
//                 data: "lng",
//                 start: 23,
//                 end: 26,
//               },
//               start: 22,
//               end: 27,
//             },
//           },
//           {
//             type: "Attribute",
//             data: " distance={10}",
//             start: 28,
//             end: 42,
//             name: { data: "distance", start: 29, end: 37 },
//             value: {
//               type: "ExpressionAttribute",
//               expression: {
//                 type: "Literal",
//                 data: "10",
//                 value: 10,
//                 start: 39,
//                 end: 41,
//               },
//               start: 38,
//               end: 42,
//             },
//           },
//         ],
//         children: [],
//         bind: "Map",
//         start: 0,
//         end: 45,
//       },
//     ],
//   };
//   const data = {
//     lat: "30.26715",
//     lng: "-97.74306",
//   };

//   const c = new Compiler(ast, data);
//   const output = c.compile();
//   const expected = {
//     html: [
//       {
//         type: "ComponentDirective",
//         data: ":component",
//         attributes: [
//           {
//             type: "Attribute",
//             data: ' lat="{lat}"',
//             start: 4,
//             end: 16,
//             name: { data: "lat", start: 5, end: 8 },
//             value: {
//               type: "ExpressionAttribute",
//               data: "{lat}",
//               expression: {
//                 type: "Identifier",
//                 data: "lat",
//                 start: 11,
//                 end: 14,
//               },
//               start: 10,
//               end: 15,
//             },
//           },
//           {
//             type: "Attribute",
//             data: ' lng="{lng}"',
//             start: 16,
//             end: 28,
//             name: { data: "lng", start: 17, end: 20 },
//             value: {
//               type: "ExpressionAttribute",
//               data: "{lng}",
//               expression: {
//                 type: "Identifier",
//                 data: "lng",
//                 start: 23,
//                 end: 26,
//               },
//               start: 22,
//               end: 27,
//             },
//           },
//           {
//             type: "Attribute",
//             data: " distance={10}",
//             start: 28,
//             end: 42,
//             name: { data: "distance", start: 29, end: 37 },
//             value: {
//               type: "ExpressionAttribute",
//               expression: {
//                 type: "Literal",
//                 data: "10",
//                 value: 10,
//                 start: 39,
//                 end: 41,
//               },
//               start: 38,
//               end: 42,
//             },
//           },
//         ],
//         children: [],
//         bind: "Map",
//         start: 0,
//         end: 45,
//       },
//     ],
//   };

//   // Have to Stringify otherwise 'assertEquals' fail for unknown reason
//   assertEquals(JSON.stringify(output), JSON.stringify(expected));
// });

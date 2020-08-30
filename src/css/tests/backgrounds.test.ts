import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Background Attachment", () => {
  const css = new Set([
    "bg-fixed",
    "bg-local",
    "bg-scroll",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-fixed {
  background-attachment: fixed;
}
.bg-local {
  background-attachment: local;
}
.bg-scroll {
  background-attachment: scroll;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Clip", () => {
  const css = new Set([
    "bg-clip-border",
    "bg-clip-padding",
    "bg-clip-content",
    "bg-clip-text",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-clip-border {
  background-clip: border-box;
}
.bg-clip-padding {
  background-clip: padding-box;
}
.bg-clip-content {
  background-clip: content-box;
}
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Color", () => {
  const css = new Set([
    "bg-transparent",
    "bg-current",
    "bg-black",
    "bg-white",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
    "bg-orange-100",
    "bg-orange-200",
    "bg-orange-300",
    "bg-orange-400",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-orange-800",
    "bg-orange-900",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
    "bg-teal-100",
    "bg-teal-200",
    "bg-teal-300",
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
    "bg-teal-700",
    "bg-teal-800",
    "bg-teal-900",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-indigo-800",
    "bg-indigo-900",
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-purple-800",
    "bg-purple-900",
    "bg-pink-100",
    "bg-pink-200",
    "bg-pink-300",
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
    "bg-pink-700",
    "bg-pink-800",
    "bg-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-transparent {
  background-color: transparent;
}
.bg-current {
  background-color: currentColor;
}
.bg-black {
  --bg-opacity: 1;
  background-color: #000;
  background-color: rgba(0, 0, 0, var(--bg-opacity));
}
.bg-white {
  --bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
}
.bg-gray-100 {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}
.bg-gray-200 {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}
.bg-gray-300 {
  --bg-opacity: 1;
  background-color: #e2e8f0;
  background-color: rgba(226, 232, 240, var(--bg-opacity));
}
.bg-gray-400 {
  --bg-opacity: 1;
  background-color: #cbd5e0;
  background-color: rgba(203, 213, 224, var(--bg-opacity));
}
.bg-gray-500 {
  --bg-opacity: 1;
  background-color: #a0aec0;
  background-color: rgba(160, 174, 192, var(--bg-opacity));
}
.bg-gray-600 {
  --bg-opacity: 1;
  background-color: #718096;
  background-color: rgba(113, 128, 150, var(--bg-opacity));
}
.bg-gray-700 {
  --bg-opacity: 1;
  background-color: #4a5568;
  background-color: rgba(74, 85, 104, var(--bg-opacity));
}
.bg-gray-800 {
  --bg-opacity: 1;
  background-color: #2d3748;
  background-color: rgba(45, 55, 72, var(--bg-opacity));
}
.bg-gray-900 {
  --bg-opacity: 1;
  background-color: #1a202c;
  background-color: rgba(26, 32, 44, var(--bg-opacity));
}
.bg-red-100 {
  --bg-opacity: 1;
  background-color: #fff5f5;
  background-color: rgba(255, 245, 245, var(--bg-opacity));
}
.bg-red-200 {
  --bg-opacity: 1;
  background-color: #fed7d7;
  background-color: rgba(254, 215, 215, var(--bg-opacity));
}
.bg-red-300 {
  --bg-opacity: 1;
  background-color: #feb2b2;
  background-color: rgba(254, 178, 178, var(--bg-opacity));
}
.bg-red-400 {
  --bg-opacity: 1;
  background-color: #fc8181;
  background-color: rgba(252, 129, 129, var(--bg-opacity));
}
.bg-red-500 {
  --bg-opacity: 1;
  background-color: #f56565;
  background-color: rgba(245, 101, 101, var(--bg-opacity));
}
.bg-red-600 {
  --bg-opacity: 1;
  background-color: #e53e3e;
  background-color: rgba(229, 62, 62, var(--bg-opacity));
}
.bg-red-700 {
  --bg-opacity: 1;
  background-color: #c53030;
  background-color: rgba(197, 48, 48, var(--bg-opacity));
}
.bg-red-800 {
  --bg-opacity: 1;
  background-color: #9b2c2c;
  background-color: rgba(155, 44, 44, var(--bg-opacity));
}
.bg-red-900 {
  --bg-opacity: 1;
  background-color: #742a2a;
  background-color: rgba(116, 42, 42, var(--bg-opacity));
}
.bg-orange-100 {
  --bg-opacity: 1;
  background-color: #fffaf0;
  background-color: rgba(255, 250, 240, var(--bg-opacity));
}
.bg-orange-200 {
  --bg-opacity: 1;
  background-color: #feebc8;
  background-color: rgba(254, 235, 200, var(--bg-opacity));
}
.bg-orange-300 {
  --bg-opacity: 1;
  background-color: #fbd38d;
  background-color: rgba(251, 211, 141, var(--bg-opacity));
}
.bg-orange-400 {
  --bg-opacity: 1;
  background-color: #f6ad55;
  background-color: rgba(246, 173, 85, var(--bg-opacity));
}
.bg-orange-500 {
  --bg-opacity: 1;
  background-color: #ed8936;
  background-color: rgba(237, 137, 54, var(--bg-opacity));
}
.bg-orange-600 {
  --bg-opacity: 1;
  background-color: #dd6b20;
  background-color: rgba(221, 107, 32, var(--bg-opacity));
}
.bg-orange-700 {
  --bg-opacity: 1;
  background-color: #c05621;
  background-color: rgba(192, 86, 33, var(--bg-opacity));
}
.bg-orange-800 {
  --bg-opacity: 1;
  background-color: #9c4221;
  background-color: rgba(156, 66, 33, var(--bg-opacity));
}
.bg-orange-900 {
  --bg-opacity: 1;
  background-color: #7b341e;
  background-color: rgba(123, 52, 30, var(--bg-opacity));
}
.bg-yellow-100 {
  --bg-opacity: 1;
  background-color: ivory;
  background-color: rgba(255, 255, 240, var(--bg-opacity));
}
.bg-yellow-200 {
  --bg-opacity: 1;
  background-color: #fefcbf;
  background-color: rgba(254, 252, 191, var(--bg-opacity));
}
.bg-yellow-300 {
  --bg-opacity: 1;
  background-color: #faf089;
  background-color: rgba(250, 240, 137, var(--bg-opacity));
}
.bg-yellow-400 {
  --bg-opacity: 1;
  background-color: #f6e05e;
  background-color: rgba(246, 224, 94, var(--bg-opacity));
}
.bg-yellow-500 {
  --bg-opacity: 1;
  background-color: #ecc94b;
  background-color: rgba(236, 201, 75, var(--bg-opacity));
}
.bg-yellow-600 {
  --bg-opacity: 1;
  background-color: #d69e2e;
  background-color: rgba(214, 158, 46, var(--bg-opacity));
}
.bg-yellow-700 {
  --bg-opacity: 1;
  background-color: #b7791f;
  background-color: rgba(183, 121, 31, var(--bg-opacity));
}
.bg-yellow-800 {
  --bg-opacity: 1;
  background-color: #975a16;
  background-color: rgba(151, 90, 22, var(--bg-opacity));
}
.bg-yellow-900 {
  --bg-opacity: 1;
  background-color: #744210;
  background-color: rgba(116, 66, 16, var(--bg-opacity));
}
.bg-green-100 {
  --bg-opacity: 1;
  background-color: #f0fff4;
  background-color: rgba(240, 255, 244, var(--bg-opacity));
}
.bg-green-200 {
  --bg-opacity: 1;
  background-color: #c6f6d5;
  background-color: rgba(198, 246, 213, var(--bg-opacity));
}
.bg-green-300 {
  --bg-opacity: 1;
  background-color: #9ae6b4;
  background-color: rgba(154, 230, 180, var(--bg-opacity));
}
.bg-green-400 {
  --bg-opacity: 1;
  background-color: #68d391;
  background-color: rgba(104, 211, 145, var(--bg-opacity));
}
.bg-green-500 {
  --bg-opacity: 1;
  background-color: #48bb78;
  background-color: rgba(72, 187, 120, var(--bg-opacity));
}
.bg-green-600 {
  --bg-opacity: 1;
  background-color: #38a169;
  background-color: rgba(56, 161, 105, var(--bg-opacity));
}
.bg-green-700 {
  --bg-opacity: 1;
  background-color: #2f855a;
  background-color: rgba(47, 133, 90, var(--bg-opacity));
}
.bg-green-800 {
  --bg-opacity: 1;
  background-color: #276749;
  background-color: rgba(39, 103, 73, var(--bg-opacity));
}
.bg-green-900 {
  --bg-opacity: 1;
  background-color: #22543d;
  background-color: rgba(34, 84, 61, var(--bg-opacity));
}
.bg-teal-100 {
  --bg-opacity: 1;
  background-color: #e6fffa;
  background-color: rgba(230, 255, 250, var(--bg-opacity));
}
.bg-teal-200 {
  --bg-opacity: 1;
  background-color: #b2f5ea;
  background-color: rgba(178, 245, 234, var(--bg-opacity));
}
.bg-teal-300 {
  --bg-opacity: 1;
  background-color: #81e6d9;
  background-color: rgba(129, 230, 217, var(--bg-opacity));
}
.bg-teal-400 {
  --bg-opacity: 1;
  background-color: #4fd1c5;
  background-color: rgba(79, 209, 197, var(--bg-opacity));
}
.bg-teal-500 {
  --bg-opacity: 1;
  background-color: #38b2ac;
  background-color: rgba(56, 178, 172, var(--bg-opacity));
}
.bg-teal-600 {
  --bg-opacity: 1;
  background-color: #319795;
  background-color: rgba(49, 151, 149, var(--bg-opacity));
}
.bg-teal-700 {
  --bg-opacity: 1;
  background-color: #2c7a7b;
  background-color: rgba(44, 122, 123, var(--bg-opacity));
}
.bg-teal-800 {
  --bg-opacity: 1;
  background-color: #285e61;
  background-color: rgba(40, 94, 97, var(--bg-opacity));
}
.bg-teal-900 {
  --bg-opacity: 1;
  background-color: #234e52;
  background-color: rgba(35, 78, 82, var(--bg-opacity));
}
.bg-blue-100 {
  --bg-opacity: 1;
  background-color: #ebf8ff;
  background-color: rgba(235, 248, 255, var(--bg-opacity));
}
.bg-blue-200 {
  --bg-opacity: 1;
  background-color: #bee3f8;
  background-color: rgba(190, 227, 248, var(--bg-opacity));
}
.bg-blue-300 {
  --bg-opacity: 1;
  background-color: #90cdf4;
  background-color: rgba(144, 205, 244, var(--bg-opacity));
}
.bg-blue-400 {
  --bg-opacity: 1;
  background-color: #63b3ed;
  background-color: rgba(99, 179, 237, var(--bg-opacity));
}
.bg-blue-500 {
  --bg-opacity: 1;
  background-color: #4299e1;
  background-color: rgba(66, 153, 225, var(--bg-opacity));
}
.bg-blue-600 {
  --bg-opacity: 1;
  background-color: #3182ce;
  background-color: rgba(49, 130, 206, var(--bg-opacity));
}
.bg-blue-700 {
  --bg-opacity: 1;
  background-color: #2b6cb0;
  background-color: rgba(43, 108, 176, var(--bg-opacity));
}
.bg-blue-800 {
  --bg-opacity: 1;
  background-color: #2c5282;
  background-color: rgba(44, 82, 130, var(--bg-opacity));
}
.bg-blue-900 {
  --bg-opacity: 1;
  background-color: #2a4365;
  background-color: rgba(42, 67, 101, var(--bg-opacity));
}
.bg-indigo-100 {
  --bg-opacity: 1;
  background-color: #ebf4ff;
  background-color: rgba(235, 244, 255, var(--bg-opacity));
}
.bg-indigo-200 {
  --bg-opacity: 1;
  background-color: #c3dafe;
  background-color: rgba(195, 218, 254, var(--bg-opacity));
}
.bg-indigo-300 {
  --bg-opacity: 1;
  background-color: #a3bffa;
  background-color: rgba(163, 191, 250, var(--bg-opacity));
}
.bg-indigo-400 {
  --bg-opacity: 1;
  background-color: #7f9cf5;
  background-color: rgba(127, 156, 245, var(--bg-opacity));
}
.bg-indigo-500 {
  --bg-opacity: 1;
  background-color: #667eea;
  background-color: rgba(102, 126, 234, var(--bg-opacity));
}
.bg-indigo-600 {
  --bg-opacity: 1;
  background-color: #5a67d8;
  background-color: rgba(90, 103, 216, var(--bg-opacity));
}
.bg-indigo-700 {
  --bg-opacity: 1;
  background-color: #4c51bf;
  background-color: rgba(76, 81, 191, var(--bg-opacity));
}
.bg-indigo-800 {
  --bg-opacity: 1;
  background-color: #434190;
  background-color: rgba(67, 65, 144, var(--bg-opacity));
}
.bg-indigo-900 {
  --bg-opacity: 1;
  background-color: #3c366b;
  background-color: rgba(60, 54, 107, var(--bg-opacity));
}
.bg-purple-100 {
  --bg-opacity: 1;
  background-color: #faf5ff;
  background-color: rgba(250, 245, 255, var(--bg-opacity));
}
.bg-purple-200 {
  --bg-opacity: 1;
  background-color: #e9d8fd;
  background-color: rgba(233, 216, 253, var(--bg-opacity));
}
.bg-purple-300 {
  --bg-opacity: 1;
  background-color: #d6bcfa;
  background-color: rgba(214, 188, 250, var(--bg-opacity));
}
.bg-purple-400 {
  --bg-opacity: 1;
  background-color: #b794f4;
  background-color: rgba(183, 148, 244, var(--bg-opacity));
}
.bg-purple-500 {
  --bg-opacity: 1;
  background-color: #9f7aea;
  background-color: rgba(159, 122, 234, var(--bg-opacity));
}
.bg-purple-600 {
  --bg-opacity: 1;
  background-color: #805ad5;
  background-color: rgba(128, 90, 213, var(--bg-opacity));
}
.bg-purple-700 {
  --bg-opacity: 1;
  background-color: #6b46c1;
  background-color: rgba(107, 70, 193, var(--bg-opacity));
}
.bg-purple-800 {
  --bg-opacity: 1;
  background-color: #553c9a;
  background-color: rgba(85, 60, 154, var(--bg-opacity));
}
.bg-purple-900 {
  --bg-opacity: 1;
  background-color: #44337a;
  background-color: rgba(68, 51, 122, var(--bg-opacity));
}
.bg-pink-100 {
  --bg-opacity: 1;
  background-color: #fff5f7;
  background-color: rgba(255, 245, 247, var(--bg-opacity));
}
.bg-pink-200 {
  --bg-opacity: 1;
  background-color: #fed7e2;
  background-color: rgba(254, 215, 226, var(--bg-opacity));
}
.bg-pink-300 {
  --bg-opacity: 1;
  background-color: #fbb6ce;
  background-color: rgba(251, 182, 206, var(--bg-opacity));
}
.bg-pink-400 {
  --bg-opacity: 1;
  background-color: #f687b3;
  background-color: rgba(246, 135, 179, var(--bg-opacity));
}
.bg-pink-500 {
  --bg-opacity: 1;
  background-color: #ed64a6;
  background-color: rgba(237, 100, 166, var(--bg-opacity));
}
.bg-pink-600 {
  --bg-opacity: 1;
  background-color: #d53f8c;
  background-color: rgba(213, 63, 140, var(--bg-opacity));
}
.bg-pink-700 {
  --bg-opacity: 1;
  background-color: #b83280;
  background-color: rgba(184, 50, 128, var(--bg-opacity));
}
.bg-pink-800 {
  --bg-opacity: 1;
  background-color: #97266d;
  background-color: rgba(151, 38, 109, var(--bg-opacity));
}
.bg-pink-900 {
  --bg-opacity: 1;
  background-color: #702459;
  background-color: rgba(112, 36, 89, var(--bg-opacity));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Opacity", () => {
  const css = new Set([
    "bg-opacity-0",
    "bg-opacity-25",
    "bg-opacity-33",
    "bg-opacity-50",
    "bg-opacity-75",
    "bg-opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-opacity-0 {
  --bg-opacity: 0;
}
.bg-opacity-25 {
  --bg-opacity: 0.25;
}
.bg-opacity-33 {
  --bg-opacity: 0.33;
}
.bg-opacity-50 {
  --bg-opacity: 0.5;
}
.bg-opacity-75 {
  --bg-opacity: 0.75;
}
.bg-opacity-100 {
  --bg-opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Position", () => {
  const css = new Set([
    "bg-bottom",
    "bg-center",
    "bg-left",
    "bg-left-bottom",
    "bg-left-top",
    "bg-right",
    "bg-right-bottom",
    "bg-right-top",
    "bg-top",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-bottom {
  background-position: bottom;
}
.bg-center {
  background-position: center;
}
.bg-left {
  background-position: left;
}
.bg-left-bottom {
  background-position: left bottom;
}
.bg-left-top {
  background-position: left top;
}
.bg-right {
  background-position: right;
}
.bg-right-bottom {
  background-position: right bottom;
}
.bg-right-top {
  background-position: right top;
}
.bg-top {
  background-position: top;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Repeat", () => {
  const css = new Set([
    "bg-repeat",
    "bg-no-repeat",
    "bg-repeat-x",
    "bg-repeat-y",
    "bg-repeat-round",
    "bg-repeat-space",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-repeat {
  background-repeat: repeat;
}
.bg-no-repeat {
  background-repeat: no-repeat;
}
.bg-repeat-x {
  background-repeat: repeat-x;
}
.bg-repeat-y {
  background-repeat: repeat-y;
}
.bg-repeat-round {
  background-repeat: round;
}
.bg-repeat-space {
  background-repeat: space;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Size", () => {
  const css = new Set([
    "bg-auto",
    "bg-cover",
    "bg-contain",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-auto {
  background-size: auto;
}
.bg-cover {
  background-size: cover;
}
.bg-contain {
  background-size: contain;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Background Image", () => {
  const css = new Set([
    "bg-none",
    "bg-gradient-to-t",
    "bg-gradient-to-tr",
    "bg-gradient-to-r",
    "bg-gradient-to-br",
    "bg-gradient-to-b",
    "bg-gradient-to-bl",
    "bg-gradient-to-l",
    "bg-gradient-to-tl",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.bg-none {
  background-image: none;
}
.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--gradient-color-stops));
}
.bg-gradient-to-tr {
  background-image: linear-gradient(to top right, var(--gradient-color-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--gradient-color-stops));
}
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--gradient-color-stops));
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--gradient-color-stops));
}
.bg-gradient-to-bl {
  background-image: linear-gradient(to bottom left, var(--gradient-color-stops));
}
.bg-gradient-to-l {
  background-image: linear-gradient(to left, var(--gradient-color-stops));
}
.bg-gradient-to-tl {
  background-image: linear-gradient(to top left, var(--gradient-color-stops));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Gradient Color Stops", () => {
  const css = new Set([
    "from-transparent",
    "from-current",
    "from-black",
    "from-white",
    "from-gray-100",
    "from-gray-200",
    "from-gray-300",
    "from-gray-400",
    "from-gray-500",
    "from-gray-600",
    "from-gray-700",
    "from-gray-800",
    "from-gray-900",
    "from-red-100",
    "from-red-200",
    "from-red-300",
    "from-red-400",
    "from-red-500",
    "from-red-600",
    "from-red-700",
    "from-red-800",
    "from-red-900",
    "from-orange-100",
    "from-orange-200",
    "from-orange-300",
    "from-orange-400",
    "from-orange-500",
    "from-orange-600",
    "from-orange-700",
    "from-orange-800",
    "from-orange-900",
    "from-yellow-100",
    "from-yellow-200",
    "from-yellow-300",
    "from-yellow-400",
    "from-yellow-500",
    "from-yellow-600",
    "from-yellow-700",
    "from-yellow-800",
    "from-yellow-900",
    "from-green-100",
    "from-green-200",
    "from-green-300",
    "from-green-400",
    "from-green-500",
    "from-green-600",
    "from-green-700",
    "from-green-800",
    "from-green-900",
    "from-teal-100",
    "from-teal-200",
    "from-teal-300",
    "from-teal-400",
    "from-teal-500",
    "from-teal-600",
    "from-teal-700",
    "from-teal-800",
    "from-teal-900",
    "from-blue-100",
    "from-blue-200",
    "from-blue-300",
    "from-blue-400",
    "from-blue-500",
    "from-blue-600",
    "from-blue-700",
    "from-blue-800",
    "from-blue-900",
    "from-indigo-100",
    "from-indigo-200",
    "from-indigo-300",
    "from-indigo-400",
    "from-indigo-500",
    "from-indigo-600",
    "from-indigo-700",
    "from-indigo-800",
    "from-indigo-900",
    "from-purple-100",
    "from-purple-200",
    "from-purple-300",
    "from-purple-400",
    "from-purple-500",
    "from-purple-600",
    "from-purple-700",
    "from-purple-800",
    "from-purple-900",
    "from-pink-100",
    "from-pink-200",
    "from-pink-300",
    "from-pink-400",
    "from-pink-500",
    "from-pink-600",
    "from-pink-700",
    "from-pink-800",
    "from-pink-900",
    "via-transparent",
    "via-current",
    "via-black",
    "via-white",
    "via-gray-100",
    "via-gray-200",
    "via-gray-300",
    "via-gray-400",
    "via-gray-500",
    "via-gray-600",
    "via-gray-700",
    "via-gray-800",
    "via-gray-900",
    "via-red-100",
    "via-red-200",
    "via-red-300",
    "via-red-400",
    "via-red-500",
    "via-red-600",
    "via-red-700",
    "via-red-800",
    "via-red-900",
    "via-orange-100",
    "via-orange-200",
    "via-orange-300",
    "via-orange-400",
    "via-orange-500",
    "via-orange-600",
    "via-orange-700",
    "via-orange-800",
    "via-orange-900",
    "via-yellow-100",
    "via-yellow-200",
    "via-yellow-300",
    "via-yellow-400",
    "via-yellow-500",
    "via-yellow-600",
    "via-yellow-700",
    "via-yellow-800",
    "via-yellow-900",
    "via-green-100",
    "via-green-200",
    "via-green-300",
    "via-green-400",
    "via-green-500",
    "via-green-600",
    "via-green-700",
    "via-green-800",
    "via-green-900",
    "via-teal-100",
    "via-teal-200",
    "via-teal-300",
    "via-teal-400",
    "via-teal-500",
    "via-teal-600",
    "via-teal-700",
    "via-teal-800",
    "via-teal-900",
    "via-blue-100",
    "via-blue-200",
    "via-blue-300",
    "via-blue-400",
    "via-blue-500",
    "via-blue-600",
    "via-blue-700",
    "via-blue-800",
    "via-blue-900",
    "via-indigo-100",
    "via-indigo-200",
    "via-indigo-300",
    "via-indigo-400",
    "via-indigo-500",
    "via-indigo-600",
    "via-indigo-700",
    "via-indigo-800",
    "via-indigo-900",
    "via-purple-100",
    "via-purple-200",
    "via-purple-300",
    "via-purple-400",
    "via-purple-500",
    "via-purple-600",
    "via-purple-700",
    "via-purple-800",
    "via-purple-900",
    "via-pink-100",
    "via-pink-200",
    "via-pink-300",
    "via-pink-400",
    "via-pink-500",
    "via-pink-600",
    "via-pink-700",
    "via-pink-800",
    "via-pink-900",
    "to-transparent",
    "to-current",
    "to-black",
    "to-white",
    "to-gray-100",
    "to-gray-200",
    "to-gray-300",
    "to-gray-400",
    "to-gray-500",
    "to-gray-600",
    "to-gray-700",
    "to-gray-800",
    "to-gray-900",
    "to-red-100",
    "to-red-200",
    "to-red-300",
    "to-red-400",
    "to-red-500",
    "to-red-600",
    "to-red-700",
    "to-red-800",
    "to-red-900",
    "to-orange-100",
    "to-orange-200",
    "to-orange-300",
    "to-orange-400",
    "to-orange-500",
    "to-orange-600",
    "to-orange-700",
    "to-orange-800",
    "to-orange-900",
    "to-yellow-100",
    "to-yellow-200",
    "to-yellow-300",
    "to-yellow-400",
    "to-yellow-500",
    "to-yellow-600",
    "to-yellow-700",
    "to-yellow-800",
    "to-yellow-900",
    "to-green-100",
    "to-green-200",
    "to-green-300",
    "to-green-400",
    "to-green-500",
    "to-green-600",
    "to-green-700",
    "to-green-800",
    "to-green-900",
    "to-teal-100",
    "to-teal-200",
    "to-teal-300",
    "to-teal-400",
    "to-teal-500",
    "to-teal-600",
    "to-teal-700",
    "to-teal-800",
    "to-teal-900",
    "to-blue-100",
    "to-blue-200",
    "to-blue-300",
    "to-blue-400",
    "to-blue-500",
    "to-blue-600",
    "to-blue-700",
    "to-blue-800",
    "to-blue-900",
    "to-indigo-100",
    "to-indigo-200",
    "to-indigo-300",
    "to-indigo-400",
    "to-indigo-500",
    "to-indigo-600",
    "to-indigo-700",
    "to-indigo-800",
    "to-indigo-900",
    "to-purple-100",
    "to-purple-200",
    "to-purple-300",
    "to-purple-400",
    "to-purple-500",
    "to-purple-600",
    "to-purple-700",
    "to-purple-800",
    "to-purple-900",
    "to-pink-100",
    "to-pink-200",
    "to-pink-300",
    "to-pink-400",
    "to-pink-500",
    "to-pink-600",
    "to-pink-700",
    "to-pink-800",
    "to-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.from-transparent {
  --gradient-from-color: transparent;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(0, 0, 0, 0));
}
.from-current {
  --gradient-from-color: currentColor;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 255, 255, 0));
}
.from-black {
  --gradient-from-color: #000;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(0, 0, 0, 0));
}
.from-white {
  --gradient-from-color: #fff;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 255, 255, 0));
}
.from-gray-100 {
  --gradient-from-color: #f7fafc;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(247, 250, 252, 0));
}
.from-gray-200 {
  --gradient-from-color: #edf2f7;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(237, 242, 247, 0));
}
.from-gray-300 {
  --gradient-from-color: #e2e8f0;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(226, 232, 240, 0));
}
.from-gray-400 {
  --gradient-from-color: #cbd5e0;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(203, 213, 224, 0));
}
.from-gray-500 {
  --gradient-from-color: #a0aec0;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(160, 174, 192, 0));
}
.from-gray-600 {
  --gradient-from-color: #718096;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(113, 128, 150, 0));
}
.from-gray-700 {
  --gradient-from-color: #4a5568;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(74, 85, 104, 0));
}
.from-gray-800 {
  --gradient-from-color: #2d3748;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(45, 55, 72, 0));
}
.from-gray-900 {
  --gradient-from-color: #1a202c;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(26, 32, 44, 0));
}
.from-red-100 {
  --gradient-from-color: #fff5f5;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 245, 245, 0));
}
.from-red-200 {
  --gradient-from-color: #fed7d7;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(254, 215, 215, 0));
}
.from-red-300 {
  --gradient-from-color: #feb2b2;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(254, 178, 178, 0));
}
.from-red-400 {
  --gradient-from-color: #fc8181;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(252, 129, 129, 0));
}
.from-red-500 {
  --gradient-from-color: #f56565;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(245, 101, 101, 0));
}
.from-red-600 {
  --gradient-from-color: #e53e3e;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(229, 62, 62, 0));
}
.from-red-700 {
  --gradient-from-color: #c53030;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(197, 48, 48, 0));
}
.from-red-800 {
  --gradient-from-color: #9b2c2c;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(155, 44, 44, 0));
}
.from-red-900 {
  --gradient-from-color: #742a2a;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(116, 42, 42, 0));
}
.from-orange-100 {
  --gradient-from-color: #fffaf0;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 250, 240, 0));
}
.from-orange-200 {
  --gradient-from-color: #feebc8;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(254, 235, 200, 0));
}
.from-orange-300 {
  --gradient-from-color: #fbd38d;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(251, 211, 141, 0));
}
.from-orange-400 {
  --gradient-from-color: #f6ad55;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(246, 173, 85, 0));
}
.from-orange-500 {
  --gradient-from-color: #ed8936;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(237, 137, 54, 0));
}
.from-orange-600 {
  --gradient-from-color: #dd6b20;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(221, 107, 32, 0));
}
.from-orange-700 {
  --gradient-from-color: #c05621;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(192, 86, 33, 0));
}
.from-orange-800 {
  --gradient-from-color: #9c4221;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(156, 66, 33, 0));
}
.from-orange-900 {
  --gradient-from-color: #7b341e;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(123, 52, 30, 0));
}
.from-yellow-100 {
  --gradient-from-color: ivory;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 255, 240, 0));
}
.from-yellow-200 {
  --gradient-from-color: #fefcbf;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(254, 252, 191, 0));
}
.from-yellow-300 {
  --gradient-from-color: #faf089;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(250, 240, 137, 0));
}
.from-yellow-400 {
  --gradient-from-color: #f6e05e;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(246, 224, 94, 0));
}
.from-yellow-500 {
  --gradient-from-color: #ecc94b;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(236, 201, 75, 0));
}
.from-yellow-600 {
  --gradient-from-color: #d69e2e;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(214, 158, 46, 0));
}
.from-yellow-700 {
  --gradient-from-color: #b7791f;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(183, 121, 31, 0));
}
.from-yellow-800 {
  --gradient-from-color: #975a16;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(151, 90, 22, 0));
}
.from-yellow-900 {
  --gradient-from-color: #744210;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(116, 66, 16, 0));
}
.from-green-100 {
  --gradient-from-color: #f0fff4;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(240, 255, 244, 0));
}
.from-green-200 {
  --gradient-from-color: #c6f6d5;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(198, 246, 213, 0));
}
.from-green-300 {
  --gradient-from-color: #9ae6b4;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(154, 230, 180, 0));
}
.from-green-400 {
  --gradient-from-color: #68d391;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(104, 211, 145, 0));
}
.from-green-500 {
  --gradient-from-color: #48bb78;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(72, 187, 120, 0));
}
.from-green-600 {
  --gradient-from-color: #38a169;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(56, 161, 105, 0));
}
.from-green-700 {
  --gradient-from-color: #2f855a;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(47, 133, 90, 0));
}
.from-green-800 {
  --gradient-from-color: #276749;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(39, 103, 73, 0));
}
.from-green-900 {
  --gradient-from-color: #22543d;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(34, 84, 61, 0));
}
.from-teal-100 {
  --gradient-from-color: #e6fffa;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(230, 255, 250, 0));
}
.from-teal-200 {
  --gradient-from-color: #b2f5ea;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(178, 245, 234, 0));
}
.from-teal-300 {
  --gradient-from-color: #81e6d9;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(129, 230, 217, 0));
}
.from-teal-400 {
  --gradient-from-color: #4fd1c5;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(79, 209, 197, 0));
}
.from-teal-500 {
  --gradient-from-color: #38b2ac;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(56, 178, 172, 0));
}
.from-teal-600 {
  --gradient-from-color: #319795;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(49, 151, 149, 0));
}
.from-teal-700 {
  --gradient-from-color: #2c7a7b;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(44, 122, 123, 0));
}
.from-teal-800 {
  --gradient-from-color: #285e61;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(40, 94, 97, 0));
}
.from-teal-900 {
  --gradient-from-color: #234e52;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(35, 78, 82, 0));
}
.from-blue-100 {
  --gradient-from-color: #ebf8ff;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(235, 248, 255, 0));
}
.from-blue-200 {
  --gradient-from-color: #bee3f8;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(190, 227, 248, 0));
}
.from-blue-300 {
  --gradient-from-color: #90cdf4;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(144, 205, 244, 0));
}
.from-blue-400 {
  --gradient-from-color: #63b3ed;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(99, 179, 237, 0));
}
.from-blue-500 {
  --gradient-from-color: #4299e1;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(66, 153, 225, 0));
}
.from-blue-600 {
  --gradient-from-color: #3182ce;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(49, 130, 206, 0));
}
.from-blue-700 {
  --gradient-from-color: #2b6cb0;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(43, 108, 176, 0));
}
.from-blue-800 {
  --gradient-from-color: #2c5282;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(44, 82, 130, 0));
}
.from-blue-900 {
  --gradient-from-color: #2a4365;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(42, 67, 101, 0));
}
.from-indigo-100 {
  --gradient-from-color: #ebf4ff;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(235, 244, 255, 0));
}
.from-indigo-200 {
  --gradient-from-color: #c3dafe;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(195, 218, 254, 0));
}
.from-indigo-300 {
  --gradient-from-color: #a3bffa;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(163, 191, 250, 0));
}
.from-indigo-400 {
  --gradient-from-color: #7f9cf5;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(127, 156, 245, 0));
}
.from-indigo-500 {
  --gradient-from-color: #667eea;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(102, 126, 234, 0));
}
.from-indigo-600 {
  --gradient-from-color: #5a67d8;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(90, 103, 216, 0));
}
.from-indigo-700 {
  --gradient-from-color: #4c51bf;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(76, 81, 191, 0));
}
.from-indigo-800 {
  --gradient-from-color: #434190;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(67, 65, 144, 0));
}
.from-indigo-900 {
  --gradient-from-color: #3c366b;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(60, 54, 107, 0));
}
.from-purple-100 {
  --gradient-from-color: #faf5ff;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(250, 245, 255, 0));
}
.from-purple-200 {
  --gradient-from-color: #e9d8fd;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(233, 216, 253, 0));
}
.from-purple-300 {
  --gradient-from-color: #d6bcfa;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(214, 188, 250, 0));
}
.from-purple-400 {
  --gradient-from-color: #b794f4;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(183, 148, 244, 0));
}
.from-purple-500 {
  --gradient-from-color: #9f7aea;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(159, 122, 234, 0));
}
.from-purple-600 {
  --gradient-from-color: #805ad5;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(128, 90, 213, 0));
}
.from-purple-700 {
  --gradient-from-color: #6b46c1;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(107, 70, 193, 0));
}
.from-purple-800 {
  --gradient-from-color: #553c9a;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(85, 60, 154, 0));
}
.from-purple-900 {
  --gradient-from-color: #44337a;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(68, 51, 122, 0));
}
.from-pink-100 {
  --gradient-from-color: #fff5f7;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(255, 245, 247, 0));
}
.from-pink-200 {
  --gradient-from-color: #fed7e2;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(254, 215, 226, 0));
}
.from-pink-300 {
  --gradient-from-color: #fbb6ce;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(251, 182, 206, 0));
}
.from-pink-400 {
  --gradient-from-color: #f687b3;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(246, 135, 179, 0));
}
.from-pink-500 {
  --gradient-from-color: #ed64a6;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(237, 100, 166, 0));
}
.from-pink-600 {
  --gradient-from-color: #d53f8c;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(213, 63, 140, 0));
}
.from-pink-700 {
  --gradient-from-color: #b83280;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(184, 50, 128, 0));
}
.from-pink-800 {
  --gradient-from-color: #97266d;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(151, 38, 109, 0));
}
.from-pink-900 {
  --gradient-from-color: #702459;
  --gradient-color-stops: var(--gradient-from-color),
    var(--gradient-to-color, rgba(112, 36, 89, 0));
}
.via-transparent {
  --gradient-via-color: transparent;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(0, 0, 0, 0));
}
.via-current {
  --gradient-via-color: currentColor;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 255, 255, 0));
}
.via-black {
  --gradient-via-color: #000;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(0, 0, 0, 0));
}
.via-white {
  --gradient-via-color: #fff;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 255, 255, 0));
}
.via-gray-100 {
  --gradient-via-color: #f7fafc;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(247, 250, 252, 0));
}
.via-gray-200 {
  --gradient-via-color: #edf2f7;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(237, 242, 247, 0));
}
.via-gray-300 {
  --gradient-via-color: #e2e8f0;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(226, 232, 240, 0));
}
.via-gray-400 {
  --gradient-via-color: #cbd5e0;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(203, 213, 224, 0));
}
.via-gray-500 {
  --gradient-via-color: #a0aec0;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(160, 174, 192, 0));
}
.via-gray-600 {
  --gradient-via-color: #718096;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(113, 128, 150, 0));
}
.via-gray-700 {
  --gradient-via-color: #4a5568;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(74, 85, 104, 0));
}
.via-gray-800 {
  --gradient-via-color: #2d3748;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(45, 55, 72, 0));
}
.via-gray-900 {
  --gradient-via-color: #1a202c;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(26, 32, 44, 0));
}
.via-red-100 {
  --gradient-via-color: #fff5f5;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 245, 245, 0));
}
.via-red-200 {
  --gradient-via-color: #fed7d7;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(254, 215, 215, 0));
}
.via-red-300 {
  --gradient-via-color: #feb2b2;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(254, 178, 178, 0));
}
.via-red-400 {
  --gradient-via-color: #fc8181;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(252, 129, 129, 0));
}
.via-red-500 {
  --gradient-via-color: #f56565;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(245, 101, 101, 0));
}
.via-red-600 {
  --gradient-via-color: #e53e3e;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(229, 62, 62, 0));
}
.via-red-700 {
  --gradient-via-color: #c53030;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(197, 48, 48, 0));
}
.via-red-800 {
  --gradient-via-color: #9b2c2c;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(155, 44, 44, 0));
}
.via-red-900 {
  --gradient-via-color: #742a2a;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(116, 42, 42, 0));
}
.via-orange-100 {
  --gradient-via-color: #fffaf0;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 250, 240, 0));
}
.via-orange-200 {
  --gradient-via-color: #feebc8;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(254, 235, 200, 0));
}
.via-orange-300 {
  --gradient-via-color: #fbd38d;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(251, 211, 141, 0));
}
.via-orange-400 {
  --gradient-via-color: #f6ad55;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(246, 173, 85, 0));
}
.via-orange-500 {
  --gradient-via-color: #ed8936;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(237, 137, 54, 0));
}
.via-orange-600 {
  --gradient-via-color: #dd6b20;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(221, 107, 32, 0));
}
.via-orange-700 {
  --gradient-via-color: #c05621;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(192, 86, 33, 0));
}
.via-orange-800 {
  --gradient-via-color: #9c4221;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(156, 66, 33, 0));
}
.via-orange-900 {
  --gradient-via-color: #7b341e;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(123, 52, 30, 0));
}
.via-yellow-100 {
  --gradient-via-color: ivory;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 255, 240, 0));
}
.via-yellow-200 {
  --gradient-via-color: #fefcbf;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(254, 252, 191, 0));
}
.via-yellow-300 {
  --gradient-via-color: #faf089;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(250, 240, 137, 0));
}
.via-yellow-400 {
  --gradient-via-color: #f6e05e;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(246, 224, 94, 0));
}
.via-yellow-500 {
  --gradient-via-color: #ecc94b;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(236, 201, 75, 0));
}
.via-yellow-600 {
  --gradient-via-color: #d69e2e;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(214, 158, 46, 0));
}
.via-yellow-700 {
  --gradient-via-color: #b7791f;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(183, 121, 31, 0));
}
.via-yellow-800 {
  --gradient-via-color: #975a16;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(151, 90, 22, 0));
}
.via-yellow-900 {
  --gradient-via-color: #744210;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(116, 66, 16, 0));
}
.via-green-100 {
  --gradient-via-color: #f0fff4;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(240, 255, 244, 0));
}
.via-green-200 {
  --gradient-via-color: #c6f6d5;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(198, 246, 213, 0));
}
.via-green-300 {
  --gradient-via-color: #9ae6b4;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(154, 230, 180, 0));
}
.via-green-400 {
  --gradient-via-color: #68d391;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(104, 211, 145, 0));
}
.via-green-500 {
  --gradient-via-color: #48bb78;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(72, 187, 120, 0));
}
.via-green-600 {
  --gradient-via-color: #38a169;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(56, 161, 105, 0));
}
.via-green-700 {
  --gradient-via-color: #2f855a;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(47, 133, 90, 0));
}
.via-green-800 {
  --gradient-via-color: #276749;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(39, 103, 73, 0));
}
.via-green-900 {
  --gradient-via-color: #22543d;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(34, 84, 61, 0));
}
.via-teal-100 {
  --gradient-via-color: #e6fffa;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(230, 255, 250, 0));
}
.via-teal-200 {
  --gradient-via-color: #b2f5ea;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(178, 245, 234, 0));
}
.via-teal-300 {
  --gradient-via-color: #81e6d9;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(129, 230, 217, 0));
}
.via-teal-400 {
  --gradient-via-color: #4fd1c5;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(79, 209, 197, 0));
}
.via-teal-500 {
  --gradient-via-color: #38b2ac;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(56, 178, 172, 0));
}
.via-teal-600 {
  --gradient-via-color: #319795;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(49, 151, 149, 0));
}
.via-teal-700 {
  --gradient-via-color: #2c7a7b;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(44, 122, 123, 0));
}
.via-teal-800 {
  --gradient-via-color: #285e61;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(40, 94, 97, 0));
}
.via-teal-900 {
  --gradient-via-color: #234e52;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(35, 78, 82, 0));
}
.via-blue-100 {
  --gradient-via-color: #ebf8ff;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(235, 248, 255, 0));
}
.via-blue-200 {
  --gradient-via-color: #bee3f8;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(190, 227, 248, 0));
}
.via-blue-300 {
  --gradient-via-color: #90cdf4;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(144, 205, 244, 0));
}
.via-blue-400 {
  --gradient-via-color: #63b3ed;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(99, 179, 237, 0));
}
.via-blue-500 {
  --gradient-via-color: #4299e1;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(66, 153, 225, 0));
}
.via-blue-600 {
  --gradient-via-color: #3182ce;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(49, 130, 206, 0));
}
.via-blue-700 {
  --gradient-via-color: #2b6cb0;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(43, 108, 176, 0));
}
.via-blue-800 {
  --gradient-via-color: #2c5282;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(44, 82, 130, 0));
}
.via-blue-900 {
  --gradient-via-color: #2a4365;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(42, 67, 101, 0));
}
.via-indigo-100 {
  --gradient-via-color: #ebf4ff;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(235, 244, 255, 0));
}
.via-indigo-200 {
  --gradient-via-color: #c3dafe;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(195, 218, 254, 0));
}
.via-indigo-300 {
  --gradient-via-color: #a3bffa;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(163, 191, 250, 0));
}
.via-indigo-400 {
  --gradient-via-color: #7f9cf5;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(127, 156, 245, 0));
}
.via-indigo-500 {
  --gradient-via-color: #667eea;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(102, 126, 234, 0));
}
.via-indigo-600 {
  --gradient-via-color: #5a67d8;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(90, 103, 216, 0));
}
.via-indigo-700 {
  --gradient-via-color: #4c51bf;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(76, 81, 191, 0));
}
.via-indigo-800 {
  --gradient-via-color: #434190;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(67, 65, 144, 0));
}
.via-indigo-900 {
  --gradient-via-color: #3c366b;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(60, 54, 107, 0));
}
.via-purple-100 {
  --gradient-via-color: #faf5ff;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(250, 245, 255, 0));
}
.via-purple-200 {
  --gradient-via-color: #e9d8fd;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(233, 216, 253, 0));
}
.via-purple-300 {
  --gradient-via-color: #d6bcfa;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(214, 188, 250, 0));
}
.via-purple-400 {
  --gradient-via-color: #b794f4;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(183, 148, 244, 0));
}
.via-purple-500 {
  --gradient-via-color: #9f7aea;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(159, 122, 234, 0));
}
.via-purple-600 {
  --gradient-via-color: #805ad5;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(128, 90, 213, 0));
}
.via-purple-700 {
  --gradient-via-color: #6b46c1;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(107, 70, 193, 0));
}
.via-purple-800 {
  --gradient-via-color: #553c9a;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(85, 60, 154, 0));
}
.via-purple-900 {
  --gradient-via-color: #44337a;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(68, 51, 122, 0));
}
.via-pink-100 {
  --gradient-via-color: #fff5f7;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(255, 245, 247, 0));
}
.via-pink-200 {
  --gradient-via-color: #fed7e2;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(254, 215, 226, 0));
}
.via-pink-300 {
  --gradient-via-color: #fbb6ce;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(251, 182, 206, 0));
}
.via-pink-400 {
  --gradient-via-color: #f687b3;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(246, 135, 179, 0));
}
.via-pink-500 {
  --gradient-via-color: #ed64a6;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(237, 100, 166, 0));
}
.via-pink-600 {
  --gradient-via-color: #d53f8c;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(213, 63, 140, 0));
}
.via-pink-700 {
  --gradient-via-color: #b83280;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(184, 50, 128, 0));
}
.via-pink-800 {
  --gradient-via-color: #97266d;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(151, 38, 109, 0));
}
.via-pink-900 {
  --gradient-via-color: #702459;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color),
    var(--gradient-to-color, rgba(112, 36, 89, 0));
}
.to-transparent {
  --gradient-to-color: transparent;
}
.to-current {
  --gradient-to-color: currentColor;
}
.to-black {
  --gradient-to-color: #000;
}
.to-white {
  --gradient-to-color: #fff;
}
.to-gray-100 {
  --gradient-to-color: #f7fafc;
}
.to-gray-200 {
  --gradient-to-color: #edf2f7;
}
.to-gray-300 {
  --gradient-to-color: #e2e8f0;
}
.to-gray-400 {
  --gradient-to-color: #cbd5e0;
}
.to-gray-500 {
  --gradient-to-color: #a0aec0;
}
.to-gray-600 {
  --gradient-to-color: #718096;
}
.to-gray-700 {
  --gradient-to-color: #4a5568;
}
.to-gray-800 {
  --gradient-to-color: #2d3748;
}
.to-gray-900 {
  --gradient-to-color: #1a202c;
}
.to-red-100 {
  --gradient-to-color: #fff5f5;
}
.to-red-200 {
  --gradient-to-color: #fed7d7;
}
.to-red-300 {
  --gradient-to-color: #feb2b2;
}
.to-red-400 {
  --gradient-to-color: #fc8181;
}
.to-red-500 {
  --gradient-to-color: #f56565;
}
.to-red-600 {
  --gradient-to-color: #e53e3e;
}
.to-red-700 {
  --gradient-to-color: #c53030;
}
.to-red-800 {
  --gradient-to-color: #9b2c2c;
}
.to-red-900 {
  --gradient-to-color: #742a2a;
}
.to-orange-100 {
  --gradient-to-color: #fffaf0;
}
.to-orange-200 {
  --gradient-to-color: #feebc8;
}
.to-orange-300 {
  --gradient-to-color: #fbd38d;
}
.to-orange-400 {
  --gradient-to-color: #f6ad55;
}
.to-orange-500 {
  --gradient-to-color: #ed8936;
}
.to-orange-600 {
  --gradient-to-color: #dd6b20;
}
.to-orange-700 {
  --gradient-to-color: #c05621;
}
.to-orange-800 {
  --gradient-to-color: #9c4221;
}
.to-orange-900 {
  --gradient-to-color: #7b341e;
}
.to-yellow-100 {
  --gradient-to-color: ivory;
}
.to-yellow-200 {
  --gradient-to-color: #fefcbf;
}
.to-yellow-300 {
  --gradient-to-color: #faf089;
}
.to-yellow-400 {
  --gradient-to-color: #f6e05e;
}
.to-yellow-500 {
  --gradient-to-color: #ecc94b;
}
.to-yellow-600 {
  --gradient-to-color: #d69e2e;
}
.to-yellow-700 {
  --gradient-to-color: #b7791f;
}
.to-yellow-800 {
  --gradient-to-color: #975a16;
}
.to-yellow-900 {
  --gradient-to-color: #744210;
}
.to-green-100 {
  --gradient-to-color: #f0fff4;
}
.to-green-200 {
  --gradient-to-color: #c6f6d5;
}
.to-green-300 {
  --gradient-to-color: #9ae6b4;
}
.to-green-400 {
  --gradient-to-color: #68d391;
}
.to-green-500 {
  --gradient-to-color: #48bb78;
}
.to-green-600 {
  --gradient-to-color: #38a169;
}
.to-green-700 {
  --gradient-to-color: #2f855a;
}
.to-green-800 {
  --gradient-to-color: #276749;
}
.to-green-900 {
  --gradient-to-color: #22543d;
}
.to-teal-100 {
  --gradient-to-color: #e6fffa;
}
.to-teal-200 {
  --gradient-to-color: #b2f5ea;
}
.to-teal-300 {
  --gradient-to-color: #81e6d9;
}
.to-teal-400 {
  --gradient-to-color: #4fd1c5;
}
.to-teal-500 {
  --gradient-to-color: #38b2ac;
}
.to-teal-600 {
  --gradient-to-color: #319795;
}
.to-teal-700 {
  --gradient-to-color: #2c7a7b;
}
.to-teal-800 {
  --gradient-to-color: #285e61;
}
.to-teal-900 {
  --gradient-to-color: #234e52;
}
.to-blue-100 {
  --gradient-to-color: #ebf8ff;
}
.to-blue-200 {
  --gradient-to-color: #bee3f8;
}
.to-blue-300 {
  --gradient-to-color: #90cdf4;
}
.to-blue-400 {
  --gradient-to-color: #63b3ed;
}
.to-blue-500 {
  --gradient-to-color: #4299e1;
}
.to-blue-600 {
  --gradient-to-color: #3182ce;
}
.to-blue-700 {
  --gradient-to-color: #2b6cb0;
}
.to-blue-800 {
  --gradient-to-color: #2c5282;
}
.to-blue-900 {
  --gradient-to-color: #2a4365;
}
.to-indigo-100 {
  --gradient-to-color: #ebf4ff;
}
.to-indigo-200 {
  --gradient-to-color: #c3dafe;
}
.to-indigo-300 {
  --gradient-to-color: #a3bffa;
}
.to-indigo-400 {
  --gradient-to-color: #7f9cf5;
}
.to-indigo-500 {
  --gradient-to-color: #667eea;
}
.to-indigo-600 {
  --gradient-to-color: #5a67d8;
}
.to-indigo-700 {
  --gradient-to-color: #4c51bf;
}
.to-indigo-800 {
  --gradient-to-color: #434190;
}
.to-indigo-900 {
  --gradient-to-color: #3c366b;
}
.to-purple-100 {
  --gradient-to-color: #faf5ff;
}
.to-purple-200 {
  --gradient-to-color: #e9d8fd;
}
.to-purple-300 {
  --gradient-to-color: #d6bcfa;
}
.to-purple-400 {
  --gradient-to-color: #b794f4;
}
.to-purple-500 {
  --gradient-to-color: #9f7aea;
}
.to-purple-600 {
  --gradient-to-color: #805ad5;
}
.to-purple-700 {
  --gradient-to-color: #6b46c1;
}
.to-purple-800 {
  --gradient-to-color: #553c9a;
}
.to-purple-900 {
  --gradient-to-color: #44337a;
}
.to-pink-100 {
  --gradient-to-color: #fff5f7;
}
.to-pink-200 {
  --gradient-to-color: #fed7e2;
}
.to-pink-300 {
  --gradient-to-color: #fbb6ce;
}
.to-pink-400 {
  --gradient-to-color: #f687b3;
}
.to-pink-500 {
  --gradient-to-color: #ed64a6;
}
.to-pink-600 {
  --gradient-to-color: #d53f8c;
}
.to-pink-700 {
  --gradient-to-color: #b83280;
}
.to-pink-800 {
  --gradient-to-color: #97266d;
}
.to-pink-900 {
  --gradient-to-color: #702459;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

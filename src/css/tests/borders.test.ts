import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Border Radius", () => {
  const css = new Set([
    "rounded-none",
    "rounded-sm",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-full",
    "rounded-t-none",
    "rounded-r-none",
    "rounded-b-none",
    "rounded-l-none",
    "rounded-t-sm",
    "rounded-r-sm",
    "rounded-b-sm",
    "rounded-l-sm",
    "rounded-t",
    "rounded-r",
    "rounded-b",
    "rounded-l",
    "rounded-t-md",
    "rounded-r-md",
    "rounded-b-md",
    "rounded-l-md",
    "rounded-t-lg",
    "rounded-r-lg",
    "rounded-b-lg",
    "rounded-l-lg",
    "rounded-t-full",
    "rounded-r-full",
    "rounded-b-full",
    "rounded-l-full",
    "rounded-tl-none",
    "rounded-tr-none",
    "rounded-br-none",
    "rounded-bl-none",
    "rounded-tl-sm",
    "rounded-tr-sm",
    "rounded-br-sm",
    "rounded-bl-sm",
    "rounded-tl",
    "rounded-tr",
    "rounded-br",
    "rounded-bl",
    "rounded-tl-md",
    "rounded-tr-md",
    "rounded-br-md",
    "rounded-bl-md",
    "rounded-tl-lg",
    "rounded-tr-lg",
    "rounded-br-lg",
    "rounded-bl-lg",
    "rounded-tl-full",
    "rounded-tr-full",
    "rounded-br-full",
    "rounded-bl-full",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.rounded-none {
  border-radius: 0;
}
.rounded-sm {
  border-radius: 0.125rem;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-t-none {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.rounded-r-none {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.rounded-b-none {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.rounded-l-none {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.rounded-t-sm {
  border-top-left-radius: 0.125rem;
  border-top-right-radius: 0.125rem;
}
.rounded-r-sm {
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
}
.rounded-b-sm {
  border-bottom-right-radius: 0.125rem;
  border-bottom-left-radius: 0.125rem;
}
.rounded-l-sm {
  border-top-left-radius: 0.125rem;
  border-bottom-left-radius: 0.125rem;
}
.rounded-t {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.rounded-r {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.rounded-b {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.rounded-l {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.rounded-r-md {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
.rounded-b-md {
  border-bottom-right-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}
.rounded-l-md {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}
.rounded-t-lg {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.rounded-b-lg {
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.rounded-l-lg {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.rounded-t-full {
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
}
.rounded-r-full {
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}
.rounded-b-full {
  border-bottom-right-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
.rounded-l-full {
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
.rounded-tl-none {
  border-top-left-radius: 0;
}
.rounded-tr-none {
  border-top-right-radius: 0;
}
.rounded-br-none {
  border-bottom-right-radius: 0;
}
.rounded-bl-none {
  border-bottom-left-radius: 0;
}
.rounded-tl-sm {
  border-top-left-radius: 0.125rem;
}
.rounded-tr-sm {
  border-top-right-radius: 0.125rem;
}
.rounded-br-sm {
  border-bottom-right-radius: 0.125rem;
}
.rounded-bl-sm {
  border-bottom-left-radius: 0.125rem;
}
.rounded-tl {
  border-top-left-radius: 0.25rem;
}
.rounded-tr {
  border-top-right-radius: 0.25rem;
}
.rounded-br {
  border-bottom-right-radius: 0.25rem;
}
.rounded-bl {
  border-bottom-left-radius: 0.25rem;
}
.rounded-tl-md {
  border-top-left-radius: 0.375rem;
}
.rounded-tr-md {
  border-top-right-radius: 0.375rem;
}
.rounded-br-md {
  border-bottom-right-radius: 0.375rem;
}
.rounded-bl-md {
  border-bottom-left-radius: 0.375rem;
}
.rounded-tl-lg {
  border-top-left-radius: 0.5rem;
}
.rounded-tr-lg {
  border-top-right-radius: 0.5rem;
}
.rounded-br-lg {
  border-bottom-right-radius: 0.5rem;
}
.rounded-bl-lg {
  border-bottom-left-radius: 0.5rem;
}
.rounded-tl-full {
  border-top-left-radius: 9999px;
}
.rounded-tr-full {
  border-top-right-radius: 9999px;
}
.rounded-br-full {
  border-bottom-right-radius: 9999px;
}
.rounded-bl-full {
  border-bottom-left-radius: 9999px;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Border Width", () => {
  const css = new Set([
    "border-0",
    "border-2",
    "border-5",
    "border",
    "border-t-0",
    "border-t-2",
    "border-t-5",
    "border-r-0",
    "border-r-2",
    "border-r-5",
    "border-b-0",
    "border-b-2",
    "border-b-5",
    "border-l-0",
    "border-l-2",
    "border-l-5",
    "border-t",
    "border-r",
    "border-b",
    "border-l",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.border-0 {
  border-width: 0;
}
.border-2 {
  border-width: 2px;
}
.border-5 {
  border-width: 5px;
}
.border {
  border-width: 1px;
}
.border-t-0 {
  border-top-width: 0;
}
.border-t-2 {
  border-top-width: 2px;
}
.border-t-5 {
  border-top-width: 5px;
}
.border-r-0 {
  border-right-width: 0;
}
.border-r-2 {
  border-right-width: 2px;
}
.border-r-5 {
  border-right-width: 5px;
}
.border-b-0 {
  border-bottom-width: 0;
}
.border-b-2 {
  border-bottom-width: 2px;
}
.border-b-5 {
  border-bottom-width: 5px;
}
.border-l-0 {
  border-left-width: 0;
}
.border-l-2 {
  border-left-width: 2px;
}
.border-l-5 {
  border-left-width: 5px;
}
.border-t {
  border-top-width: 1px;
}
.border-r {
  border-right-width: 1px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-l {
  border-left-width: 1px;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Border Color", () => {
  const css = new Set([
    "border-transparent",
    "border-current",
    "border-black",
    "border-white",
    "border-gray-100",
    "border-gray-200",
    "border-gray-300",
    "border-gray-400",
    "border-gray-500",
    "border-gray-600",
    "border-gray-700",
    "border-gray-800",
    "border-gray-900",
    "border-red-100",
    "border-red-200",
    "border-red-300",
    "border-red-400",
    "border-red-500",
    "border-red-600",
    "border-red-700",
    "border-red-800",
    "border-red-900",
    "border-orange-100",
    "border-orange-200",
    "border-orange-300",
    "border-orange-400",
    "border-orange-500",
    "border-orange-600",
    "border-orange-700",
    "border-orange-800",
    "border-orange-900",
    "border-yellow-100",
    "border-yellow-200",
    "border-yellow-300",
    "border-yellow-400",
    "border-yellow-500",
    "border-yellow-600",
    "border-yellow-700",
    "border-yellow-800",
    "border-yellow-900",
    "border-green-100",
    "border-green-200",
    "border-green-300",
    "border-green-400",
    "border-green-500",
    "border-green-600",
    "border-green-700",
    "border-green-800",
    "border-green-900",
    "border-teal-100",
    "border-teal-200",
    "border-teal-300",
    "border-teal-400",
    "border-teal-500",
    "border-teal-600",
    "border-teal-700",
    "border-teal-800",
    "border-teal-900",
    "border-blue-100",
    "border-blue-200",
    "border-blue-300",
    "border-blue-400",
    "border-blue-500",
    "border-blue-600",
    "border-blue-700",
    "border-blue-800",
    "border-blue-900",
    "border-indigo-100",
    "border-indigo-200",
    "border-indigo-300",
    "border-indigo-400",
    "border-indigo-500",
    "border-indigo-600",
    "border-indigo-700",
    "border-indigo-800",
    "border-indigo-900",
    "border-purple-100",
    "border-purple-200",
    "border-purple-300",
    "border-purple-400",
    "border-purple-500",
    "border-purple-600",
    "border-purple-700",
    "border-purple-800",
    "border-purple-900",
    "border-pink-100",
    "border-pink-200",
    "border-pink-300",
    "border-pink-400",
    "border-pink-500",
    "border-pink-600",
    "border-pink-700",
    "border-pink-800",
    "border-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.border-transparent {
  border-color: transparent;
}
.border-current {
  border-color: currentColor;
}
.border-black {
  --border-opacity: 1;
  border-color: #000;
  border-color: rgba(0, 0, 0, var(--border-opacity));
}
.border-white {
  --border-opacity: 1;
  border-color: #fff;
  border-color: rgba(255, 255, 255, var(--border-opacity));
}
.border-gray-100 {
  --border-opacity: 1;
  border-color: #f7fafc;
  border-color: rgba(247, 250, 252, var(--border-opacity));
}
.border-gray-200 {
  --border-opacity: 1;
  border-color: #edf2f7;
  border-color: rgba(237, 242, 247, var(--border-opacity));
}
.border-gray-300 {
  --border-opacity: 1;
  border-color: #e2e8f0;
  border-color: rgba(226, 232, 240, var(--border-opacity));
}
.border-gray-400 {
  --border-opacity: 1;
  border-color: #cbd5e0;
  border-color: rgba(203, 213, 224, var(--border-opacity));
}
.border-gray-500 {
  --border-opacity: 1;
  border-color: #a0aec0;
  border-color: rgba(160, 174, 192, var(--border-opacity));
}
.border-gray-600 {
  --border-opacity: 1;
  border-color: #718096;
  border-color: rgba(113, 128, 150, var(--border-opacity));
}
.border-gray-700 {
  --border-opacity: 1;
  border-color: #4a5568;
  border-color: rgba(74, 85, 104, var(--border-opacity));
}
.border-gray-800 {
  --border-opacity: 1;
  border-color: #2d3748;
  border-color: rgba(45, 55, 72, var(--border-opacity));
}
.border-gray-900 {
  --border-opacity: 1;
  border-color: #1a202c;
  border-color: rgba(26, 32, 44, var(--border-opacity));
}
.border-red-100 {
  --border-opacity: 1;
  border-color: #fff5f5;
  border-color: rgba(255, 245, 245, var(--border-opacity));
}
.border-red-200 {
  --border-opacity: 1;
  border-color: #fed7d7;
  border-color: rgba(254, 215, 215, var(--border-opacity));
}
.border-red-300 {
  --border-opacity: 1;
  border-color: #feb2b2;
  border-color: rgba(254, 178, 178, var(--border-opacity));
}
.border-red-400 {
  --border-opacity: 1;
  border-color: #fc8181;
  border-color: rgba(252, 129, 129, var(--border-opacity));
}
.border-red-500 {
  --border-opacity: 1;
  border-color: #f56565;
  border-color: rgba(245, 101, 101, var(--border-opacity));
}
.border-red-600 {
  --border-opacity: 1;
  border-color: #e53e3e;
  border-color: rgba(229, 62, 62, var(--border-opacity));
}
.border-red-700 {
  --border-opacity: 1;
  border-color: #c53030;
  border-color: rgba(197, 48, 48, var(--border-opacity));
}
.border-red-800 {
  --border-opacity: 1;
  border-color: #9b2c2c;
  border-color: rgba(155, 44, 44, var(--border-opacity));
}
.border-red-900 {
  --border-opacity: 1;
  border-color: #742a2a;
  border-color: rgba(116, 42, 42, var(--border-opacity));
}
.border-orange-100 {
  --border-opacity: 1;
  border-color: #fffaf0;
  border-color: rgba(255, 250, 240, var(--border-opacity));
}
.border-orange-200 {
  --border-opacity: 1;
  border-color: #feebc8;
  border-color: rgba(254, 235, 200, var(--border-opacity));
}
.border-orange-300 {
  --border-opacity: 1;
  border-color: #fbd38d;
  border-color: rgba(251, 211, 141, var(--border-opacity));
}
.border-orange-400 {
  --border-opacity: 1;
  border-color: #f6ad55;
  border-color: rgba(246, 173, 85, var(--border-opacity));
}
.border-orange-500 {
  --border-opacity: 1;
  border-color: #ed8936;
  border-color: rgba(237, 137, 54, var(--border-opacity));
}
.border-orange-600 {
  --border-opacity: 1;
  border-color: #dd6b20;
  border-color: rgba(221, 107, 32, var(--border-opacity));
}
.border-orange-700 {
  --border-opacity: 1;
  border-color: #c05621;
  border-color: rgba(192, 86, 33, var(--border-opacity));
}
.border-orange-800 {
  --border-opacity: 1;
  border-color: #9c4221;
  border-color: rgba(156, 66, 33, var(--border-opacity));
}
.border-orange-900 {
  --border-opacity: 1;
  border-color: #7b341e;
  border-color: rgba(123, 52, 30, var(--border-opacity));
}
.border-yellow-100 {
  --border-opacity: 1;
  border-color: ivory;
  border-color: rgba(255, 255, 240, var(--border-opacity));
}
.border-yellow-200 {
  --border-opacity: 1;
  border-color: #fefcbf;
  border-color: rgba(254, 252, 191, var(--border-opacity));
}
.border-yellow-300 {
  --border-opacity: 1;
  border-color: #faf089;
  border-color: rgba(250, 240, 137, var(--border-opacity));
}
.border-yellow-400 {
  --border-opacity: 1;
  border-color: #f6e05e;
  border-color: rgba(246, 224, 94, var(--border-opacity));
}
.border-yellow-500 {
  --border-opacity: 1;
  border-color: #ecc94b;
  border-color: rgba(236, 201, 75, var(--border-opacity));
}
.border-yellow-600 {
  --border-opacity: 1;
  border-color: #d69e2e;
  border-color: rgba(214, 158, 46, var(--border-opacity));
}
.border-yellow-700 {
  --border-opacity: 1;
  border-color: #b7791f;
  border-color: rgba(183, 121, 31, var(--border-opacity));
}
.border-yellow-800 {
  --border-opacity: 1;
  border-color: #975a16;
  border-color: rgba(151, 90, 22, var(--border-opacity));
}
.border-yellow-900 {
  --border-opacity: 1;
  border-color: #744210;
  border-color: rgba(116, 66, 16, var(--border-opacity));
}
.border-green-100 {
  --border-opacity: 1;
  border-color: #f0fff4;
  border-color: rgba(240, 255, 244, var(--border-opacity));
}
.border-green-200 {
  --border-opacity: 1;
  border-color: #c6f6d5;
  border-color: rgba(198, 246, 213, var(--border-opacity));
}
.border-green-300 {
  --border-opacity: 1;
  border-color: #9ae6b4;
  border-color: rgba(154, 230, 180, var(--border-opacity));
}
.border-green-400 {
  --border-opacity: 1;
  border-color: #68d391;
  border-color: rgba(104, 211, 145, var(--border-opacity));
}
.border-green-500 {
  --border-opacity: 1;
  border-color: #48bb78;
  border-color: rgba(72, 187, 120, var(--border-opacity));
}
.border-green-600 {
  --border-opacity: 1;
  border-color: #38a169;
  border-color: rgba(56, 161, 105, var(--border-opacity));
}
.border-green-700 {
  --border-opacity: 1;
  border-color: #2f855a;
  border-color: rgba(47, 133, 90, var(--border-opacity));
}
.border-green-800 {
  --border-opacity: 1;
  border-color: #276749;
  border-color: rgba(39, 103, 73, var(--border-opacity));
}
.border-green-900 {
  --border-opacity: 1;
  border-color: #22543d;
  border-color: rgba(34, 84, 61, var(--border-opacity));
}
.border-teal-100 {
  --border-opacity: 1;
  border-color: #e6fffa;
  border-color: rgba(230, 255, 250, var(--border-opacity));
}
.border-teal-200 {
  --border-opacity: 1;
  border-color: #b2f5ea;
  border-color: rgba(178, 245, 234, var(--border-opacity));
}
.border-teal-300 {
  --border-opacity: 1;
  border-color: #81e6d9;
  border-color: rgba(129, 230, 217, var(--border-opacity));
}
.border-teal-400 {
  --border-opacity: 1;
  border-color: #4fd1c5;
  border-color: rgba(79, 209, 197, var(--border-opacity));
}
.border-teal-500 {
  --border-opacity: 1;
  border-color: #38b2ac;
  border-color: rgba(56, 178, 172, var(--border-opacity));
}
.border-teal-600 {
  --border-opacity: 1;
  border-color: #319795;
  border-color: rgba(49, 151, 149, var(--border-opacity));
}
.border-teal-700 {
  --border-opacity: 1;
  border-color: #2c7a7b;
  border-color: rgba(44, 122, 123, var(--border-opacity));
}
.border-teal-800 {
  --border-opacity: 1;
  border-color: #285e61;
  border-color: rgba(40, 94, 97, var(--border-opacity));
}
.border-teal-900 {
  --border-opacity: 1;
  border-color: #234e52;
  border-color: rgba(35, 78, 82, var(--border-opacity));
}
.border-blue-100 {
  --border-opacity: 1;
  border-color: #ebf8ff;
  border-color: rgba(235, 248, 255, var(--border-opacity));
}
.border-blue-200 {
  --border-opacity: 1;
  border-color: #bee3f8;
  border-color: rgba(190, 227, 248, var(--border-opacity));
}
.border-blue-300 {
  --border-opacity: 1;
  border-color: #90cdf4;
  border-color: rgba(144, 205, 244, var(--border-opacity));
}
.border-blue-400 {
  --border-opacity: 1;
  border-color: #63b3ed;
  border-color: rgba(99, 179, 237, var(--border-opacity));
}
.border-blue-500 {
  --border-opacity: 1;
  border-color: #4299e1;
  border-color: rgba(66, 153, 225, var(--border-opacity));
}
.border-blue-600 {
  --border-opacity: 1;
  border-color: #3182ce;
  border-color: rgba(49, 130, 206, var(--border-opacity));
}
.border-blue-700 {
  --border-opacity: 1;
  border-color: #2b6cb0;
  border-color: rgba(43, 108, 176, var(--border-opacity));
}
.border-blue-800 {
  --border-opacity: 1;
  border-color: #2c5282;
  border-color: rgba(44, 82, 130, var(--border-opacity));
}
.border-blue-900 {
  --border-opacity: 1;
  border-color: #2a4365;
  border-color: rgba(42, 67, 101, var(--border-opacity));
}
.border-indigo-100 {
  --border-opacity: 1;
  border-color: #ebf4ff;
  border-color: rgba(235, 244, 255, var(--border-opacity));
}
.border-indigo-200 {
  --border-opacity: 1;
  border-color: #c3dafe;
  border-color: rgba(195, 218, 254, var(--border-opacity));
}
.border-indigo-300 {
  --border-opacity: 1;
  border-color: #a3bffa;
  border-color: rgba(163, 191, 250, var(--border-opacity));
}
.border-indigo-400 {
  --border-opacity: 1;
  border-color: #7f9cf5;
  border-color: rgba(127, 156, 245, var(--border-opacity));
}
.border-indigo-500 {
  --border-opacity: 1;
  border-color: #667eea;
  border-color: rgba(102, 126, 234, var(--border-opacity));
}
.border-indigo-600 {
  --border-opacity: 1;
  border-color: #5a67d8;
  border-color: rgba(90, 103, 216, var(--border-opacity));
}
.border-indigo-700 {
  --border-opacity: 1;
  border-color: #4c51bf;
  border-color: rgba(76, 81, 191, var(--border-opacity));
}
.border-indigo-800 {
  --border-opacity: 1;
  border-color: #434190;
  border-color: rgba(67, 65, 144, var(--border-opacity));
}
.border-indigo-900 {
  --border-opacity: 1;
  border-color: #3c366b;
  border-color: rgba(60, 54, 107, var(--border-opacity));
}
.border-purple-100 {
  --border-opacity: 1;
  border-color: #faf5ff;
  border-color: rgba(250, 245, 255, var(--border-opacity));
}
.border-purple-200 {
  --border-opacity: 1;
  border-color: #e9d8fd;
  border-color: rgba(233, 216, 253, var(--border-opacity));
}
.border-purple-300 {
  --border-opacity: 1;
  border-color: #d6bcfa;
  border-color: rgba(214, 188, 250, var(--border-opacity));
}
.border-purple-400 {
  --border-opacity: 1;
  border-color: #b794f4;
  border-color: rgba(183, 148, 244, var(--border-opacity));
}
.border-purple-500 {
  --border-opacity: 1;
  border-color: #9f7aea;
  border-color: rgba(159, 122, 234, var(--border-opacity));
}
.border-purple-600 {
  --border-opacity: 1;
  border-color: #805ad5;
  border-color: rgba(128, 90, 213, var(--border-opacity));
}
.border-purple-700 {
  --border-opacity: 1;
  border-color: #6b46c1;
  border-color: rgba(107, 70, 193, var(--border-opacity));
}
.border-purple-800 {
  --border-opacity: 1;
  border-color: #553c9a;
  border-color: rgba(85, 60, 154, var(--border-opacity));
}
.border-purple-900 {
  --border-opacity: 1;
  border-color: #44337a;
  border-color: rgba(68, 51, 122, var(--border-opacity));
}
.border-pink-100 {
  --border-opacity: 1;
  border-color: #fff5f7;
  border-color: rgba(255, 245, 247, var(--border-opacity));
}
.border-pink-200 {
  --border-opacity: 1;
  border-color: #fed7e2;
  border-color: rgba(254, 215, 226, var(--border-opacity));
}
.border-pink-300 {
  --border-opacity: 1;
  border-color: #fbb6ce;
  border-color: rgba(251, 182, 206, var(--border-opacity));
}
.border-pink-400 {
  --border-opacity: 1;
  border-color: #f687b3;
  border-color: rgba(246, 135, 179, var(--border-opacity));
}
.border-pink-500 {
  --border-opacity: 1;
  border-color: #ed64a6;
  border-color: rgba(237, 100, 166, var(--border-opacity));
}
.border-pink-600 {
  --border-opacity: 1;
  border-color: #d53f8c;
  border-color: rgba(213, 63, 140, var(--border-opacity));
}
.border-pink-700 {
  --border-opacity: 1;
  border-color: #b83280;
  border-color: rgba(184, 50, 128, var(--border-opacity));
}
.border-pink-800 {
  --border-opacity: 1;
  border-color: #97266d;
  border-color: rgba(151, 38, 109, var(--border-opacity));
}
.border-pink-900 {
  --border-opacity: 1;
  border-color: #702459;
  border-color: rgba(112, 36, 89, var(--border-opacity));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Border Opacity", () => {
  const css = new Set([
    "border-opacity-0",
    "border-opacity-25",
    "border-opacity-33",
    "border-opacity-50",
    "border-opacity-75",
    "border-opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.border-opacity-0 {
  --border-opacity: 0;
}
.border-opacity-25 {
  --border-opacity: 0.25;
}
.border-opacity-33 {
  --border-opacity: 0.33;
}
.border-opacity-50 {
  --border-opacity: 0.5;
}
.border-opacity-75 {
  --border-opacity: 0.75;
}
.border-opacity-100 {
  --border-opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Border Style", () => {
  const css = new Set([
    "border-solid",
    "border-dashed",
    "border-dotted",
    "border-double",
    "border-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.border-solid {
  border-style: solid;
}
.border-dashed {
  border-style: dashed;
}
.border-dotted {
  border-style: dotted;
}
.border-double {
  border-style: double;
}
.border-none {
  border-style: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Divide Width", () => {
  const css = new Set([
    "divide-y-0",
    "divide-x-0",
    "divide-y-2",
    "divide-x-2",
    "divide-y-3",
    "divide-x-3",
    "divide-y-4",
    "divide-x-4",
    "divide-y-8",
    "divide-x-8",
    "divide-y",
    "divide-x",
    "divide-y-reverse",
    "divide-x-reverse",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.divide-y-0 > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(0px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(0px * var(--divide-y-reverse));
}
.divide-x-0 > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(0px * var(--divide-x-reverse));
  border-left-width: calc(0px * calc(1 - var(--divide-x-reverse)));
}
.divide-y-2 > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(2px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(2px * var(--divide-y-reverse));
}
.divide-x-2 > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(2px * var(--divide-x-reverse));
  border-left-width: calc(2px * calc(1 - var(--divide-x-reverse)));
}
.divide-y-3 > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(3px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(3px * var(--divide-y-reverse));
}
.divide-x-3 > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(3px * var(--divide-x-reverse));
  border-left-width: calc(3px * calc(1 - var(--divide-x-reverse)));
}
.divide-y-4 > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(4px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(4px * var(--divide-y-reverse));
}
.divide-x-4 > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(4px * var(--divide-x-reverse));
  border-left-width: calc(4px * calc(1 - var(--divide-x-reverse)));
}
.divide-y-8 > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(8px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(8px * var(--divide-y-reverse));
}
.divide-x-8 > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(8px * var(--divide-x-reverse));
  border-left-width: calc(8px * calc(1 - var(--divide-x-reverse)));
}
.divide-y > :not(template) ~ :not(template) {
  --divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--divide-y-reverse)));
  border-bottom-width: calc(1px * var(--divide-y-reverse));
}
.divide-x > :not(template) ~ :not(template) {
  --divide-x-reverse: 0;
  border-right-width: calc(1px * var(--divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--divide-x-reverse)));
}
.divide-y-reverse > :not(template) ~ :not(template) {
  --divide-y-reverse: 1;
}
.divide-x-reverse > :not(template) ~ :not(template) {
  --divide-x-reverse: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Divide Color", () => {
  const css = new Set([
    "divide-transparent",
    "divide-current",
    "divide-black",
    "divide-white",
    "divide-gray-100",
    "divide-gray-200",
    "divide-gray-300",
    "divide-gray-400",
    "divide-gray-500",
    "divide-gray-600",
    "divide-gray-700",
    "divide-gray-800",
    "divide-gray-900",
    "divide-red-100",
    "divide-red-200",
    "divide-red-300",
    "divide-red-400",
    "divide-red-500",
    "divide-red-600",
    "divide-red-700",
    "divide-red-800",
    "divide-red-900",
    "divide-orange-100",
    "divide-orange-200",
    "divide-orange-300",
    "divide-orange-400",
    "divide-orange-500",
    "divide-orange-600",
    "divide-orange-700",
    "divide-orange-800",
    "divide-orange-900",
    "divide-yellow-100",
    "divide-yellow-200",
    "divide-yellow-300",
    "divide-yellow-400",
    "divide-yellow-500",
    "divide-yellow-600",
    "divide-yellow-700",
    "divide-yellow-800",
    "divide-yellow-900",
    "divide-green-100",
    "divide-green-200",
    "divide-green-300",
    "divide-green-400",
    "divide-green-500",
    "divide-green-600",
    "divide-green-700",
    "divide-green-800",
    "divide-green-900",
    "divide-teal-100",
    "divide-teal-200",
    "divide-teal-300",
    "divide-teal-400",
    "divide-teal-500",
    "divide-teal-600",
    "divide-teal-700",
    "divide-teal-800",
    "divide-teal-900",
    "divide-blue-100",
    "divide-blue-200",
    "divide-blue-300",
    "divide-blue-400",
    "divide-blue-500",
    "divide-blue-600",
    "divide-blue-700",
    "divide-blue-800",
    "divide-blue-900",
    "divide-indigo-100",
    "divide-indigo-200",
    "divide-indigo-300",
    "divide-indigo-400",
    "divide-indigo-500",
    "divide-indigo-600",
    "divide-indigo-700",
    "divide-indigo-800",
    "divide-indigo-900",
    "divide-purple-100",
    "divide-purple-200",
    "divide-purple-300",
    "divide-purple-400",
    "divide-purple-500",
    "divide-purple-600",
    "divide-purple-700",
    "divide-purple-800",
    "divide-purple-900",
    "divide-pink-100",
    "divide-pink-200",
    "divide-pink-300",
    "divide-pink-400",
    "divide-pink-500",
    "divide-pink-600",
    "divide-pink-700",
    "divide-pink-800",
    "divide-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.divide-transparent > :not(template) ~ :not(template) {
  border-color: transparent;
}
.divide-current > :not(template) ~ :not(template) {
  border-color: currentColor;
}
.divide-black > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #000;
  border-color: rgba(0, 0, 0, var(--divide-opacity));
}
.divide-white > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fff;
  border-color: rgba(255, 255, 255, var(--divide-opacity));
}
.divide-gray-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f7fafc;
  border-color: rgba(247, 250, 252, var(--divide-opacity));
}
.divide-gray-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #edf2f7;
  border-color: rgba(237, 242, 247, var(--divide-opacity));
}
.divide-gray-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #e2e8f0;
  border-color: rgba(226, 232, 240, var(--divide-opacity));
}
.divide-gray-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #cbd5e0;
  border-color: rgba(203, 213, 224, var(--divide-opacity));
}
.divide-gray-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #a0aec0;
  border-color: rgba(160, 174, 192, var(--divide-opacity));
}
.divide-gray-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #718096;
  border-color: rgba(113, 128, 150, var(--divide-opacity));
}
.divide-gray-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #4a5568;
  border-color: rgba(74, 85, 104, var(--divide-opacity));
}
.divide-gray-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2d3748;
  border-color: rgba(45, 55, 72, var(--divide-opacity));
}
.divide-gray-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #1a202c;
  border-color: rgba(26, 32, 44, var(--divide-opacity));
}
.divide-red-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fff5f5;
  border-color: rgba(255, 245, 245, var(--divide-opacity));
}
.divide-red-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fed7d7;
  border-color: rgba(254, 215, 215, var(--divide-opacity));
}
.divide-red-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #feb2b2;
  border-color: rgba(254, 178, 178, var(--divide-opacity));
}
.divide-red-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fc8181;
  border-color: rgba(252, 129, 129, var(--divide-opacity));
}
.divide-red-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f56565;
  border-color: rgba(245, 101, 101, var(--divide-opacity));
}
.divide-red-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #e53e3e;
  border-color: rgba(229, 62, 62, var(--divide-opacity));
}
.divide-red-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #c53030;
  border-color: rgba(197, 48, 48, var(--divide-opacity));
}
.divide-red-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #9b2c2c;
  border-color: rgba(155, 44, 44, var(--divide-opacity));
}
.divide-red-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #742a2a;
  border-color: rgba(116, 42, 42, var(--divide-opacity));
}
.divide-orange-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fffaf0;
  border-color: rgba(255, 250, 240, var(--divide-opacity));
}
.divide-orange-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #feebc8;
  border-color: rgba(254, 235, 200, var(--divide-opacity));
}
.divide-orange-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fbd38d;
  border-color: rgba(251, 211, 141, var(--divide-opacity));
}
.divide-orange-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f6ad55;
  border-color: rgba(246, 173, 85, var(--divide-opacity));
}
.divide-orange-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #ed8936;
  border-color: rgba(237, 137, 54, var(--divide-opacity));
}
.divide-orange-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #dd6b20;
  border-color: rgba(221, 107, 32, var(--divide-opacity));
}
.divide-orange-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #c05621;
  border-color: rgba(192, 86, 33, var(--divide-opacity));
}
.divide-orange-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #9c4221;
  border-color: rgba(156, 66, 33, var(--divide-opacity));
}
.divide-orange-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #7b341e;
  border-color: rgba(123, 52, 30, var(--divide-opacity));
}
.divide-yellow-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: ivory;
  border-color: rgba(255, 255, 240, var(--divide-opacity));
}
.divide-yellow-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fefcbf;
  border-color: rgba(254, 252, 191, var(--divide-opacity));
}
.divide-yellow-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #faf089;
  border-color: rgba(250, 240, 137, var(--divide-opacity));
}
.divide-yellow-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f6e05e;
  border-color: rgba(246, 224, 94, var(--divide-opacity));
}
.divide-yellow-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #ecc94b;
  border-color: rgba(236, 201, 75, var(--divide-opacity));
}
.divide-yellow-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #d69e2e;
  border-color: rgba(214, 158, 46, var(--divide-opacity));
}
.divide-yellow-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #b7791f;
  border-color: rgba(183, 121, 31, var(--divide-opacity));
}
.divide-yellow-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #975a16;
  border-color: rgba(151, 90, 22, var(--divide-opacity));
}
.divide-yellow-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #744210;
  border-color: rgba(116, 66, 16, var(--divide-opacity));
}
.divide-green-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f0fff4;
  border-color: rgba(240, 255, 244, var(--divide-opacity));
}
.divide-green-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #c6f6d5;
  border-color: rgba(198, 246, 213, var(--divide-opacity));
}
.divide-green-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #9ae6b4;
  border-color: rgba(154, 230, 180, var(--divide-opacity));
}
.divide-green-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #68d391;
  border-color: rgba(104, 211, 145, var(--divide-opacity));
}
.divide-green-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #48bb78;
  border-color: rgba(72, 187, 120, var(--divide-opacity));
}
.divide-green-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #38a169;
  border-color: rgba(56, 161, 105, var(--divide-opacity));
}
.divide-green-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2f855a;
  border-color: rgba(47, 133, 90, var(--divide-opacity));
}
.divide-green-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #276749;
  border-color: rgba(39, 103, 73, var(--divide-opacity));
}
.divide-green-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #22543d;
  border-color: rgba(34, 84, 61, var(--divide-opacity));
}
.divide-teal-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #e6fffa;
  border-color: rgba(230, 255, 250, var(--divide-opacity));
}
.divide-teal-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #b2f5ea;
  border-color: rgba(178, 245, 234, var(--divide-opacity));
}
.divide-teal-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #81e6d9;
  border-color: rgba(129, 230, 217, var(--divide-opacity));
}
.divide-teal-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #4fd1c5;
  border-color: rgba(79, 209, 197, var(--divide-opacity));
}
.divide-teal-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #38b2ac;
  border-color: rgba(56, 178, 172, var(--divide-opacity));
}
.divide-teal-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #319795;
  border-color: rgba(49, 151, 149, var(--divide-opacity));
}
.divide-teal-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2c7a7b;
  border-color: rgba(44, 122, 123, var(--divide-opacity));
}
.divide-teal-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #285e61;
  border-color: rgba(40, 94, 97, var(--divide-opacity));
}
.divide-teal-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #234e52;
  border-color: rgba(35, 78, 82, var(--divide-opacity));
}
.divide-blue-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #ebf8ff;
  border-color: rgba(235, 248, 255, var(--divide-opacity));
}
.divide-blue-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #bee3f8;
  border-color: rgba(190, 227, 248, var(--divide-opacity));
}
.divide-blue-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #90cdf4;
  border-color: rgba(144, 205, 244, var(--divide-opacity));
}
.divide-blue-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #63b3ed;
  border-color: rgba(99, 179, 237, var(--divide-opacity));
}
.divide-blue-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #4299e1;
  border-color: rgba(66, 153, 225, var(--divide-opacity));
}
.divide-blue-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #3182ce;
  border-color: rgba(49, 130, 206, var(--divide-opacity));
}
.divide-blue-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2b6cb0;
  border-color: rgba(43, 108, 176, var(--divide-opacity));
}
.divide-blue-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2c5282;
  border-color: rgba(44, 82, 130, var(--divide-opacity));
}
.divide-blue-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #2a4365;
  border-color: rgba(42, 67, 101, var(--divide-opacity));
}
.divide-indigo-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #ebf4ff;
  border-color: rgba(235, 244, 255, var(--divide-opacity));
}
.divide-indigo-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #c3dafe;
  border-color: rgba(195, 218, 254, var(--divide-opacity));
}
.divide-indigo-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #a3bffa;
  border-color: rgba(163, 191, 250, var(--divide-opacity));
}
.divide-indigo-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #7f9cf5;
  border-color: rgba(127, 156, 245, var(--divide-opacity));
}
.divide-indigo-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #667eea;
  border-color: rgba(102, 126, 234, var(--divide-opacity));
}
.divide-indigo-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #5a67d8;
  border-color: rgba(90, 103, 216, var(--divide-opacity));
}
.divide-indigo-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #4c51bf;
  border-color: rgba(76, 81, 191, var(--divide-opacity));
}
.divide-indigo-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #434190;
  border-color: rgba(67, 65, 144, var(--divide-opacity));
}
.divide-indigo-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #3c366b;
  border-color: rgba(60, 54, 107, var(--divide-opacity));
}
.divide-purple-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #faf5ff;
  border-color: rgba(250, 245, 255, var(--divide-opacity));
}
.divide-purple-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #e9d8fd;
  border-color: rgba(233, 216, 253, var(--divide-opacity));
}
.divide-purple-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #d6bcfa;
  border-color: rgba(214, 188, 250, var(--divide-opacity));
}
.divide-purple-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #b794f4;
  border-color: rgba(183, 148, 244, var(--divide-opacity));
}
.divide-purple-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #9f7aea;
  border-color: rgba(159, 122, 234, var(--divide-opacity));
}
.divide-purple-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #805ad5;
  border-color: rgba(128, 90, 213, var(--divide-opacity));
}
.divide-purple-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #6b46c1;
  border-color: rgba(107, 70, 193, var(--divide-opacity));
}
.divide-purple-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #553c9a;
  border-color: rgba(85, 60, 154, var(--divide-opacity));
}
.divide-purple-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #44337a;
  border-color: rgba(68, 51, 122, var(--divide-opacity));
}
.divide-pink-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fff5f7;
  border-color: rgba(255, 245, 247, var(--divide-opacity));
}
.divide-pink-200 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fed7e2;
  border-color: rgba(254, 215, 226, var(--divide-opacity));
}
.divide-pink-300 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #fbb6ce;
  border-color: rgba(251, 182, 206, var(--divide-opacity));
}
.divide-pink-400 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #f687b3;
  border-color: rgba(246, 135, 179, var(--divide-opacity));
}
.divide-pink-500 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #ed64a6;
  border-color: rgba(237, 100, 166, var(--divide-opacity));
}
.divide-pink-600 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #d53f8c;
  border-color: rgba(213, 63, 140, var(--divide-opacity));
}
.divide-pink-700 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #b83280;
  border-color: rgba(184, 50, 128, var(--divide-opacity));
}
.divide-pink-800 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #97266d;
  border-color: rgba(151, 38, 109, var(--divide-opacity));
}
.divide-pink-900 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
  border-color: #702459;
  border-color: rgba(112, 36, 89, var(--divide-opacity));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Divide Opacity", () => {
  const css = new Set([
    "divide-opacity-0",
    "divide-opacity-25",
    "divide-opacity-33",
    "divide-opacity-50",
    "divide-opacity-75",
    "divide-opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.divide-opacity-0 > :not(template) ~ :not(template) {
  --divide-opacity: 0;
}
.divide-opacity-25 > :not(template) ~ :not(template) {
  --divide-opacity: 0.25;
}
.divide-opacity-33 > :not(template) ~ :not(template) {
  --divide-opacity: 0.33;
}
.divide-opacity-50 > :not(template) ~ :not(template) {
  --divide-opacity: 0.5;
}
.divide-opacity-75 > :not(template) ~ :not(template) {
  --divide-opacity: 0.75;
}
.divide-opacity-100 > :not(template) ~ :not(template) {
  --divide-opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Divide Style", () => {
  const css = new Set([
    "divide-solid",
    "divide-dashed",
    "divide-dotted",
    "divide-double",
    "divide-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.divide-solid > :not(template) ~ :not(template) {
  border-style: solid;
}
.divide-dashed > :not(template) ~ :not(template) {
  border-style: dashed;
}
.divide-dotted > :not(template) ~ :not(template) {
  border-style: dotted;
}
.divide-double > :not(template) ~ :not(template) {
  border-style: double;
}
.divide-none > :not(template) ~ :not(template) {
  border-style: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

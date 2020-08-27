import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Font Family", () => {
  const css = new Set([
    "font-sans",
    "font-serif",
    "font-mono",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.font-sans {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.font-serif {
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
}
.font-mono {
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Font Size", () => {
  const css = new Set([
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.text-xs {
  font-size: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-base {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}
.text-2xl {
  font-size: 1.5rem;
}
.text-3xl {
  font-size: 1.875rem;
}
.text-4xl {
  font-size: 2.25rem;
}
.text-5xl {
  font-size: 3rem;
}
.text-6xl {
  font-size: 4rem;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Font Smoothing", () => {
  const css = new Set([
    "antialiased",
    "subpixel-antialiased",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.subpixel-antialiased {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Font Style", () => {
  const css = new Set([
    "italic",
    "not-italic",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.italic {
  font-style: italic;
}
.not-italic {
  font-style: normal;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Font Weight", () => {
  const css = new Set([
    "font-hairline",
    "font-thin",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.font-hairline {
  font-weight: 100;
}
.font-thin {
  font-weight: 200;
}
.font-light {
  font-weight: 300;
}
.font-normal {
  font-weight: 400;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.font-bold {
  font-weight: 700;
}
.font-extrabold {
  font-weight: 800;
}
.font-black {
  font-weight: 900;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Letter Spacing", () => {
  const css = new Set([
    "tracking-tighter",
    "tracking-tight",
    "tracking-normal",
    "tracking-wide",
    "tracking-wider",
    "tracking-widest",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.tracking-tighter {
  letter-spacing: -0.05em;
}
.tracking-tight {
  letter-spacing: -0.025em;
}
.tracking-normal {
  letter-spacing: 0;
}
.tracking-wide {
  letter-spacing: 0.025em;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.tracking-widest {
  letter-spacing: 0.1em;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Line Height", () => {
  const css = new Set([
    "leading-3",
    "leading-6",
    "leading-11",
    "leading-none",
    "leading-tight",
    "leading-snug",
    "leading-normal",
    "leading-relaxed",
    "leading-loose",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.leading-3 {
  line-height: 0.75rem;
}
.leading-6 {
  line-height: 1.5rem;
}
.leading-11 {
  line-height: 2.75rem;
}
.leading-none {
  line-height: 1;
}
.leading-tight {
  line-height: 1.25;
}
.leading-snug {
  line-height: 1.375;
}
.leading-normal {
  line-height: 1.5;
}
.leading-relaxed {
  line-height: 1.625;
}
.leading-loose {
  line-height: 2;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) List Style Type", () => {
  const css = new Set([
    "list-none",
    "list-disc",
    "list-decimal",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.list-none {
  list-style-type: none;
}
.list-disc {
  list-style-type: disc;
}
.list-decimal {
  list-style-type: decimal;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) List Style Position", () => {
  const css = new Set([
    "list-inside",
    "list-outside",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.list-inside {
  list-style-position: inside;
}
.list-outside {
  list-style-position: outside;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Placeholder Color", () => {
  const css = new Set([
    "placeholder-transparent",
    "placeholder-current",
    "placeholder-black",
    "placeholder-white",
    "placeholder-gray-100",
    "placeholder-gray-200",
    "placeholder-gray-300",
    "placeholder-gray-400",
    "placeholder-gray-500",
    "placeholder-gray-600",
    "placeholder-gray-700",
    "placeholder-gray-800",
    "placeholder-gray-900",
    "placeholder-red-100",
    "placeholder-red-200",
    "placeholder-red-300",
    "placeholder-red-400",
    "placeholder-red-500",
    "placeholder-red-600",
    "placeholder-red-700",
    "placeholder-red-800",
    "placeholder-red-900",
    "placeholder-orange-100",
    "placeholder-orange-200",
    "placeholder-orange-300",
    "placeholder-orange-400",
    "placeholder-orange-500",
    "placeholder-orange-600",
    "placeholder-orange-700",
    "placeholder-orange-800",
    "placeholder-orange-900",
    "placeholder-yellow-100",
    "placeholder-yellow-200",
    "placeholder-yellow-300",
    "placeholder-yellow-400",
    "placeholder-yellow-500",
    "placeholder-yellow-600",
    "placeholder-yellow-700",
    "placeholder-yellow-800",
    "placeholder-yellow-900",
    "placeholder-green-100",
    "placeholder-green-200",
    "placeholder-green-300",
    "placeholder-green-400",
    "placeholder-green-500",
    "placeholder-green-600",
    "placeholder-green-700",
    "placeholder-green-800",
    "placeholder-green-900",
    "placeholder-teal-100",
    "placeholder-teal-200",
    "placeholder-teal-300",
    "placeholder-teal-400",
    "placeholder-teal-500",
    "placeholder-teal-600",
    "placeholder-teal-700",
    "placeholder-teal-800",
    "placeholder-teal-900",
    "placeholder-blue-100",
    "placeholder-blue-200",
    "placeholder-blue-300",
    "placeholder-blue-400",
    "placeholder-blue-500",
    "placeholder-blue-600",
    "placeholder-blue-700",
    "placeholder-blue-800",
    "placeholder-blue-900",
    "placeholder-indigo-100",
    "placeholder-indigo-200",
    "placeholder-indigo-300",
    "placeholder-indigo-400",
    "placeholder-indigo-500",
    "placeholder-indigo-600",
    "placeholder-indigo-700",
    "placeholder-indigo-800",
    "placeholder-indigo-900",
    "placeholder-purple-100",
    "placeholder-purple-200",
    "placeholder-purple-300",
    "placeholder-purple-400",
    "placeholder-purple-500",
    "placeholder-purple-600",
    "placeholder-purple-700",
    "placeholder-purple-800",
    "placeholder-purple-900",
    "placeholder-pink-100",
    "placeholder-pink-200",
    "placeholder-pink-300",
    "placeholder-pink-400",
    "placeholder-pink-500",
    "placeholder-pink-600",
    "placeholder-pink-700",
    "placeholder-pink-800",
    "placeholder-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.placeholder-transparent:-ms-input-placeholder, 
.placeholder-transparent::-ms-input-placeholder, 
.placeholder-transparent::placeholder {
  background-color: transparent;
}
.placeholder-current:-ms-input-placeholder, 
.placeholder-current::-ms-input-placeholder, 
.placeholder-current::placeholder {
  background-color: currentColor;
}
.placeholder-black:-ms-input-placeholder, 
.placeholder-black::-ms-input-placeholder, 
.placeholder-black::placeholder {
  --placeholder-opacity: 1;
  color: #000;
  color: rgba(0, 0, 0, var(--placeholder-opacity));
}
.placeholder-white:-ms-input-placeholder, 
.placeholder-white::-ms-input-placeholder, 
.placeholder-white::placeholder {
  --placeholder-opacity: 1;
  color: #fff;
  color: rgba(255, 255, 255, var(--placeholder-opacity));
}
.placeholder-gray-100:-ms-input-placeholder, 
.placeholder-gray-100::-ms-input-placeholder, 
.placeholder-gray-100::placeholder {
  --placeholder-opacity: 1;
  color: #f7fafc;
  color: rgba(247, 250, 252, var(--placeholder-opacity));
}
.placeholder-gray-200:-ms-input-placeholder, 
.placeholder-gray-200::-ms-input-placeholder, 
.placeholder-gray-200::placeholder {
  --placeholder-opacity: 1;
  color: #edf2f7;
  color: rgba(237, 242, 247, var(--placeholder-opacity));
}
.placeholder-gray-300:-ms-input-placeholder, 
.placeholder-gray-300::-ms-input-placeholder, 
.placeholder-gray-300::placeholder {
  --placeholder-opacity: 1;
  color: #e2e8f0;
  color: rgba(226, 232, 240, var(--placeholder-opacity));
}
.placeholder-gray-400:-ms-input-placeholder, 
.placeholder-gray-400::-ms-input-placeholder, 
.placeholder-gray-400::placeholder {
  --placeholder-opacity: 1;
  color: #cbd5e0;
  color: rgba(203, 213, 224, var(--placeholder-opacity));
}
.placeholder-gray-500:-ms-input-placeholder, 
.placeholder-gray-500::-ms-input-placeholder, 
.placeholder-gray-500::placeholder {
  --placeholder-opacity: 1;
  color: #a0aec0;
  color: rgba(160, 174, 192, var(--placeholder-opacity));
}
.placeholder-gray-600:-ms-input-placeholder, 
.placeholder-gray-600::-ms-input-placeholder, 
.placeholder-gray-600::placeholder {
  --placeholder-opacity: 1;
  color: #718096;
  color: rgba(113, 128, 150, var(--placeholder-opacity));
}
.placeholder-gray-700:-ms-input-placeholder, 
.placeholder-gray-700::-ms-input-placeholder, 
.placeholder-gray-700::placeholder {
  --placeholder-opacity: 1;
  color: #4a5568;
  color: rgba(74, 85, 104, var(--placeholder-opacity));
}
.placeholder-gray-800:-ms-input-placeholder, 
.placeholder-gray-800::-ms-input-placeholder, 
.placeholder-gray-800::placeholder {
  --placeholder-opacity: 1;
  color: #2d3748;
  color: rgba(45, 55, 72, var(--placeholder-opacity));
}
.placeholder-gray-900:-ms-input-placeholder, 
.placeholder-gray-900::-ms-input-placeholder, 
.placeholder-gray-900::placeholder {
  --placeholder-opacity: 1;
  color: #1a202c;
  color: rgba(26, 32, 44, var(--placeholder-opacity));
}
.placeholder-red-100:-ms-input-placeholder, 
.placeholder-red-100::-ms-input-placeholder, 
.placeholder-red-100::placeholder {
  --placeholder-opacity: 1;
  color: #fff5f5;
  color: rgba(255, 245, 245, var(--placeholder-opacity));
}
.placeholder-red-200:-ms-input-placeholder, 
.placeholder-red-200::-ms-input-placeholder, 
.placeholder-red-200::placeholder {
  --placeholder-opacity: 1;
  color: #fed7d7;
  color: rgba(254, 215, 215, var(--placeholder-opacity));
}
.placeholder-red-300:-ms-input-placeholder, 
.placeholder-red-300::-ms-input-placeholder, 
.placeholder-red-300::placeholder {
  --placeholder-opacity: 1;
  color: #feb2b2;
  color: rgba(254, 178, 178, var(--placeholder-opacity));
}
.placeholder-red-400:-ms-input-placeholder, 
.placeholder-red-400::-ms-input-placeholder, 
.placeholder-red-400::placeholder {
  --placeholder-opacity: 1;
  color: #fc8181;
  color: rgba(252, 129, 129, var(--placeholder-opacity));
}
.placeholder-red-500:-ms-input-placeholder, 
.placeholder-red-500::-ms-input-placeholder, 
.placeholder-red-500::placeholder {
  --placeholder-opacity: 1;
  color: #f56565;
  color: rgba(245, 101, 101, var(--placeholder-opacity));
}
.placeholder-red-600:-ms-input-placeholder, 
.placeholder-red-600::-ms-input-placeholder, 
.placeholder-red-600::placeholder {
  --placeholder-opacity: 1;
  color: #e53e3e;
  color: rgba(229, 62, 62, var(--placeholder-opacity));
}
.placeholder-red-700:-ms-input-placeholder, 
.placeholder-red-700::-ms-input-placeholder, 
.placeholder-red-700::placeholder {
  --placeholder-opacity: 1;
  color: #c53030;
  color: rgba(197, 48, 48, var(--placeholder-opacity));
}
.placeholder-red-800:-ms-input-placeholder, 
.placeholder-red-800::-ms-input-placeholder, 
.placeholder-red-800::placeholder {
  --placeholder-opacity: 1;
  color: #9b2c2c;
  color: rgba(155, 44, 44, var(--placeholder-opacity));
}
.placeholder-red-900:-ms-input-placeholder, 
.placeholder-red-900::-ms-input-placeholder, 
.placeholder-red-900::placeholder {
  --placeholder-opacity: 1;
  color: #742a2a;
  color: rgba(116, 42, 42, var(--placeholder-opacity));
}
.placeholder-orange-100:-ms-input-placeholder, 
.placeholder-orange-100::-ms-input-placeholder, 
.placeholder-orange-100::placeholder {
  --placeholder-opacity: 1;
  color: #fffaf0;
  color: rgba(255, 250, 240, var(--placeholder-opacity));
}
.placeholder-orange-200:-ms-input-placeholder, 
.placeholder-orange-200::-ms-input-placeholder, 
.placeholder-orange-200::placeholder {
  --placeholder-opacity: 1;
  color: #feebc8;
  color: rgba(254, 235, 200, var(--placeholder-opacity));
}
.placeholder-orange-300:-ms-input-placeholder, 
.placeholder-orange-300::-ms-input-placeholder, 
.placeholder-orange-300::placeholder {
  --placeholder-opacity: 1;
  color: #fbd38d;
  color: rgba(251, 211, 141, var(--placeholder-opacity));
}
.placeholder-orange-400:-ms-input-placeholder, 
.placeholder-orange-400::-ms-input-placeholder, 
.placeholder-orange-400::placeholder {
  --placeholder-opacity: 1;
  color: #f6ad55;
  color: rgba(246, 173, 85, var(--placeholder-opacity));
}
.placeholder-orange-500:-ms-input-placeholder, 
.placeholder-orange-500::-ms-input-placeholder, 
.placeholder-orange-500::placeholder {
  --placeholder-opacity: 1;
  color: #ed8936;
  color: rgba(237, 137, 54, var(--placeholder-opacity));
}
.placeholder-orange-600:-ms-input-placeholder, 
.placeholder-orange-600::-ms-input-placeholder, 
.placeholder-orange-600::placeholder {
  --placeholder-opacity: 1;
  color: #dd6b20;
  color: rgba(221, 107, 32, var(--placeholder-opacity));
}
.placeholder-orange-700:-ms-input-placeholder, 
.placeholder-orange-700::-ms-input-placeholder, 
.placeholder-orange-700::placeholder {
  --placeholder-opacity: 1;
  color: #c05621;
  color: rgba(192, 86, 33, var(--placeholder-opacity));
}
.placeholder-orange-800:-ms-input-placeholder, 
.placeholder-orange-800::-ms-input-placeholder, 
.placeholder-orange-800::placeholder {
  --placeholder-opacity: 1;
  color: #9c4221;
  color: rgba(156, 66, 33, var(--placeholder-opacity));
}
.placeholder-orange-900:-ms-input-placeholder, 
.placeholder-orange-900::-ms-input-placeholder, 
.placeholder-orange-900::placeholder {
  --placeholder-opacity: 1;
  color: #7b341e;
  color: rgba(123, 52, 30, var(--placeholder-opacity));
}
.placeholder-yellow-100:-ms-input-placeholder, 
.placeholder-yellow-100::-ms-input-placeholder, 
.placeholder-yellow-100::placeholder {
  --placeholder-opacity: 1;
  color: ivory;
  color: rgba(255, 255, 240, var(--placeholder-opacity));
}
.placeholder-yellow-200:-ms-input-placeholder, 
.placeholder-yellow-200::-ms-input-placeholder, 
.placeholder-yellow-200::placeholder {
  --placeholder-opacity: 1;
  color: #fefcbf;
  color: rgba(254, 252, 191, var(--placeholder-opacity));
}
.placeholder-yellow-300:-ms-input-placeholder, 
.placeholder-yellow-300::-ms-input-placeholder, 
.placeholder-yellow-300::placeholder {
  --placeholder-opacity: 1;
  color: #faf089;
  color: rgba(250, 240, 137, var(--placeholder-opacity));
}
.placeholder-yellow-400:-ms-input-placeholder, 
.placeholder-yellow-400::-ms-input-placeholder, 
.placeholder-yellow-400::placeholder {
  --placeholder-opacity: 1;
  color: #f6e05e;
  color: rgba(246, 224, 94, var(--placeholder-opacity));
}
.placeholder-yellow-500:-ms-input-placeholder, 
.placeholder-yellow-500::-ms-input-placeholder, 
.placeholder-yellow-500::placeholder {
  --placeholder-opacity: 1;
  color: #ecc94b;
  color: rgba(236, 201, 75, var(--placeholder-opacity));
}
.placeholder-yellow-600:-ms-input-placeholder, 
.placeholder-yellow-600::-ms-input-placeholder, 
.placeholder-yellow-600::placeholder {
  --placeholder-opacity: 1;
  color: #d69e2e;
  color: rgba(214, 158, 46, var(--placeholder-opacity));
}
.placeholder-yellow-700:-ms-input-placeholder, 
.placeholder-yellow-700::-ms-input-placeholder, 
.placeholder-yellow-700::placeholder {
  --placeholder-opacity: 1;
  color: #b7791f;
  color: rgba(183, 121, 31, var(--placeholder-opacity));
}
.placeholder-yellow-800:-ms-input-placeholder, 
.placeholder-yellow-800::-ms-input-placeholder, 
.placeholder-yellow-800::placeholder {
  --placeholder-opacity: 1;
  color: #975a16;
  color: rgba(151, 90, 22, var(--placeholder-opacity));
}
.placeholder-yellow-900:-ms-input-placeholder, 
.placeholder-yellow-900::-ms-input-placeholder, 
.placeholder-yellow-900::placeholder {
  --placeholder-opacity: 1;
  color: #744210;
  color: rgba(116, 66, 16, var(--placeholder-opacity));
}
.placeholder-green-100:-ms-input-placeholder, 
.placeholder-green-100::-ms-input-placeholder, 
.placeholder-green-100::placeholder {
  --placeholder-opacity: 1;
  color: #f0fff4;
  color: rgba(240, 255, 244, var(--placeholder-opacity));
}
.placeholder-green-200:-ms-input-placeholder, 
.placeholder-green-200::-ms-input-placeholder, 
.placeholder-green-200::placeholder {
  --placeholder-opacity: 1;
  color: #c6f6d5;
  color: rgba(198, 246, 213, var(--placeholder-opacity));
}
.placeholder-green-300:-ms-input-placeholder, 
.placeholder-green-300::-ms-input-placeholder, 
.placeholder-green-300::placeholder {
  --placeholder-opacity: 1;
  color: #9ae6b4;
  color: rgba(154, 230, 180, var(--placeholder-opacity));
}
.placeholder-green-400:-ms-input-placeholder, 
.placeholder-green-400::-ms-input-placeholder, 
.placeholder-green-400::placeholder {
  --placeholder-opacity: 1;
  color: #68d391;
  color: rgba(104, 211, 145, var(--placeholder-opacity));
}
.placeholder-green-500:-ms-input-placeholder, 
.placeholder-green-500::-ms-input-placeholder, 
.placeholder-green-500::placeholder {
  --placeholder-opacity: 1;
  color: #48bb78;
  color: rgba(72, 187, 120, var(--placeholder-opacity));
}
.placeholder-green-600:-ms-input-placeholder, 
.placeholder-green-600::-ms-input-placeholder, 
.placeholder-green-600::placeholder {
  --placeholder-opacity: 1;
  color: #38a169;
  color: rgba(56, 161, 105, var(--placeholder-opacity));
}
.placeholder-green-700:-ms-input-placeholder, 
.placeholder-green-700::-ms-input-placeholder, 
.placeholder-green-700::placeholder {
  --placeholder-opacity: 1;
  color: #2f855a;
  color: rgba(47, 133, 90, var(--placeholder-opacity));
}
.placeholder-green-800:-ms-input-placeholder, 
.placeholder-green-800::-ms-input-placeholder, 
.placeholder-green-800::placeholder {
  --placeholder-opacity: 1;
  color: #276749;
  color: rgba(39, 103, 73, var(--placeholder-opacity));
}
.placeholder-green-900:-ms-input-placeholder, 
.placeholder-green-900::-ms-input-placeholder, 
.placeholder-green-900::placeholder {
  --placeholder-opacity: 1;
  color: #22543d;
  color: rgba(34, 84, 61, var(--placeholder-opacity));
}
.placeholder-teal-100:-ms-input-placeholder, 
.placeholder-teal-100::-ms-input-placeholder, 
.placeholder-teal-100::placeholder {
  --placeholder-opacity: 1;
  color: #e6fffa;
  color: rgba(230, 255, 250, var(--placeholder-opacity));
}
.placeholder-teal-200:-ms-input-placeholder, 
.placeholder-teal-200::-ms-input-placeholder, 
.placeholder-teal-200::placeholder {
  --placeholder-opacity: 1;
  color: #b2f5ea;
  color: rgba(178, 245, 234, var(--placeholder-opacity));
}
.placeholder-teal-300:-ms-input-placeholder, 
.placeholder-teal-300::-ms-input-placeholder, 
.placeholder-teal-300::placeholder {
  --placeholder-opacity: 1;
  color: #81e6d9;
  color: rgba(129, 230, 217, var(--placeholder-opacity));
}
.placeholder-teal-400:-ms-input-placeholder, 
.placeholder-teal-400::-ms-input-placeholder, 
.placeholder-teal-400::placeholder {
  --placeholder-opacity: 1;
  color: #4fd1c5;
  color: rgba(79, 209, 197, var(--placeholder-opacity));
}
.placeholder-teal-500:-ms-input-placeholder, 
.placeholder-teal-500::-ms-input-placeholder, 
.placeholder-teal-500::placeholder {
  --placeholder-opacity: 1;
  color: #38b2ac;
  color: rgba(56, 178, 172, var(--placeholder-opacity));
}
.placeholder-teal-600:-ms-input-placeholder, 
.placeholder-teal-600::-ms-input-placeholder, 
.placeholder-teal-600::placeholder {
  --placeholder-opacity: 1;
  color: #319795;
  color: rgba(49, 151, 149, var(--placeholder-opacity));
}
.placeholder-teal-700:-ms-input-placeholder, 
.placeholder-teal-700::-ms-input-placeholder, 
.placeholder-teal-700::placeholder {
  --placeholder-opacity: 1;
  color: #2c7a7b;
  color: rgba(44, 122, 123, var(--placeholder-opacity));
}
.placeholder-teal-800:-ms-input-placeholder, 
.placeholder-teal-800::-ms-input-placeholder, 
.placeholder-teal-800::placeholder {
  --placeholder-opacity: 1;
  color: #285e61;
  color: rgba(40, 94, 97, var(--placeholder-opacity));
}
.placeholder-teal-900:-ms-input-placeholder, 
.placeholder-teal-900::-ms-input-placeholder, 
.placeholder-teal-900::placeholder {
  --placeholder-opacity: 1;
  color: #234e52;
  color: rgba(35, 78, 82, var(--placeholder-opacity));
}
.placeholder-blue-100:-ms-input-placeholder, 
.placeholder-blue-100::-ms-input-placeholder, 
.placeholder-blue-100::placeholder {
  --placeholder-opacity: 1;
  color: #ebf8ff;
  color: rgba(235, 248, 255, var(--placeholder-opacity));
}
.placeholder-blue-200:-ms-input-placeholder, 
.placeholder-blue-200::-ms-input-placeholder, 
.placeholder-blue-200::placeholder {
  --placeholder-opacity: 1;
  color: #bee3f8;
  color: rgba(190, 227, 248, var(--placeholder-opacity));
}
.placeholder-blue-300:-ms-input-placeholder, 
.placeholder-blue-300::-ms-input-placeholder, 
.placeholder-blue-300::placeholder {
  --placeholder-opacity: 1;
  color: #90cdf4;
  color: rgba(144, 205, 244, var(--placeholder-opacity));
}
.placeholder-blue-400:-ms-input-placeholder, 
.placeholder-blue-400::-ms-input-placeholder, 
.placeholder-blue-400::placeholder {
  --placeholder-opacity: 1;
  color: #63b3ed;
  color: rgba(99, 179, 237, var(--placeholder-opacity));
}
.placeholder-blue-500:-ms-input-placeholder, 
.placeholder-blue-500::-ms-input-placeholder, 
.placeholder-blue-500::placeholder {
  --placeholder-opacity: 1;
  color: #4299e1;
  color: rgba(66, 153, 225, var(--placeholder-opacity));
}
.placeholder-blue-600:-ms-input-placeholder, 
.placeholder-blue-600::-ms-input-placeholder, 
.placeholder-blue-600::placeholder {
  --placeholder-opacity: 1;
  color: #3182ce;
  color: rgba(49, 130, 206, var(--placeholder-opacity));
}
.placeholder-blue-700:-ms-input-placeholder, 
.placeholder-blue-700::-ms-input-placeholder, 
.placeholder-blue-700::placeholder {
  --placeholder-opacity: 1;
  color: #2b6cb0;
  color: rgba(43, 108, 176, var(--placeholder-opacity));
}
.placeholder-blue-800:-ms-input-placeholder, 
.placeholder-blue-800::-ms-input-placeholder, 
.placeholder-blue-800::placeholder {
  --placeholder-opacity: 1;
  color: #2c5282;
  color: rgba(44, 82, 130, var(--placeholder-opacity));
}
.placeholder-blue-900:-ms-input-placeholder, 
.placeholder-blue-900::-ms-input-placeholder, 
.placeholder-blue-900::placeholder {
  --placeholder-opacity: 1;
  color: #2a4365;
  color: rgba(42, 67, 101, var(--placeholder-opacity));
}
.placeholder-indigo-100:-ms-input-placeholder, 
.placeholder-indigo-100::-ms-input-placeholder, 
.placeholder-indigo-100::placeholder {
  --placeholder-opacity: 1;
  color: #ebf4ff;
  color: rgba(235, 244, 255, var(--placeholder-opacity));
}
.placeholder-indigo-200:-ms-input-placeholder, 
.placeholder-indigo-200::-ms-input-placeholder, 
.placeholder-indigo-200::placeholder {
  --placeholder-opacity: 1;
  color: #c3dafe;
  color: rgba(195, 218, 254, var(--placeholder-opacity));
}
.placeholder-indigo-300:-ms-input-placeholder, 
.placeholder-indigo-300::-ms-input-placeholder, 
.placeholder-indigo-300::placeholder {
  --placeholder-opacity: 1;
  color: #a3bffa;
  color: rgba(163, 191, 250, var(--placeholder-opacity));
}
.placeholder-indigo-400:-ms-input-placeholder, 
.placeholder-indigo-400::-ms-input-placeholder, 
.placeholder-indigo-400::placeholder {
  --placeholder-opacity: 1;
  color: #7f9cf5;
  color: rgba(127, 156, 245, var(--placeholder-opacity));
}
.placeholder-indigo-500:-ms-input-placeholder, 
.placeholder-indigo-500::-ms-input-placeholder, 
.placeholder-indigo-500::placeholder {
  --placeholder-opacity: 1;
  color: #667eea;
  color: rgba(102, 126, 234, var(--placeholder-opacity));
}
.placeholder-indigo-600:-ms-input-placeholder, 
.placeholder-indigo-600::-ms-input-placeholder, 
.placeholder-indigo-600::placeholder {
  --placeholder-opacity: 1;
  color: #5a67d8;
  color: rgba(90, 103, 216, var(--placeholder-opacity));
}
.placeholder-indigo-700:-ms-input-placeholder, 
.placeholder-indigo-700::-ms-input-placeholder, 
.placeholder-indigo-700::placeholder {
  --placeholder-opacity: 1;
  color: #4c51bf;
  color: rgba(76, 81, 191, var(--placeholder-opacity));
}
.placeholder-indigo-800:-ms-input-placeholder, 
.placeholder-indigo-800::-ms-input-placeholder, 
.placeholder-indigo-800::placeholder {
  --placeholder-opacity: 1;
  color: #434190;
  color: rgba(67, 65, 144, var(--placeholder-opacity));
}
.placeholder-indigo-900:-ms-input-placeholder, 
.placeholder-indigo-900::-ms-input-placeholder, 
.placeholder-indigo-900::placeholder {
  --placeholder-opacity: 1;
  color: #3c366b;
  color: rgba(60, 54, 107, var(--placeholder-opacity));
}
.placeholder-purple-100:-ms-input-placeholder, 
.placeholder-purple-100::-ms-input-placeholder, 
.placeholder-purple-100::placeholder {
  --placeholder-opacity: 1;
  color: #faf5ff;
  color: rgba(250, 245, 255, var(--placeholder-opacity));
}
.placeholder-purple-200:-ms-input-placeholder, 
.placeholder-purple-200::-ms-input-placeholder, 
.placeholder-purple-200::placeholder {
  --placeholder-opacity: 1;
  color: #e9d8fd;
  color: rgba(233, 216, 253, var(--placeholder-opacity));
}
.placeholder-purple-300:-ms-input-placeholder, 
.placeholder-purple-300::-ms-input-placeholder, 
.placeholder-purple-300::placeholder {
  --placeholder-opacity: 1;
  color: #d6bcfa;
  color: rgba(214, 188, 250, var(--placeholder-opacity));
}
.placeholder-purple-400:-ms-input-placeholder, 
.placeholder-purple-400::-ms-input-placeholder, 
.placeholder-purple-400::placeholder {
  --placeholder-opacity: 1;
  color: #b794f4;
  color: rgba(183, 148, 244, var(--placeholder-opacity));
}
.placeholder-purple-500:-ms-input-placeholder, 
.placeholder-purple-500::-ms-input-placeholder, 
.placeholder-purple-500::placeholder {
  --placeholder-opacity: 1;
  color: #9f7aea;
  color: rgba(159, 122, 234, var(--placeholder-opacity));
}
.placeholder-purple-600:-ms-input-placeholder, 
.placeholder-purple-600::-ms-input-placeholder, 
.placeholder-purple-600::placeholder {
  --placeholder-opacity: 1;
  color: #805ad5;
  color: rgba(128, 90, 213, var(--placeholder-opacity));
}
.placeholder-purple-700:-ms-input-placeholder, 
.placeholder-purple-700::-ms-input-placeholder, 
.placeholder-purple-700::placeholder {
  --placeholder-opacity: 1;
  color: #6b46c1;
  color: rgba(107, 70, 193, var(--placeholder-opacity));
}
.placeholder-purple-800:-ms-input-placeholder, 
.placeholder-purple-800::-ms-input-placeholder, 
.placeholder-purple-800::placeholder {
  --placeholder-opacity: 1;
  color: #553c9a;
  color: rgba(85, 60, 154, var(--placeholder-opacity));
}
.placeholder-purple-900:-ms-input-placeholder, 
.placeholder-purple-900::-ms-input-placeholder, 
.placeholder-purple-900::placeholder {
  --placeholder-opacity: 1;
  color: #44337a;
  color: rgba(68, 51, 122, var(--placeholder-opacity));
}
.placeholder-pink-100:-ms-input-placeholder, 
.placeholder-pink-100::-ms-input-placeholder, 
.placeholder-pink-100::placeholder {
  --placeholder-opacity: 1;
  color: #fff5f7;
  color: rgba(255, 245, 247, var(--placeholder-opacity));
}
.placeholder-pink-200:-ms-input-placeholder, 
.placeholder-pink-200::-ms-input-placeholder, 
.placeholder-pink-200::placeholder {
  --placeholder-opacity: 1;
  color: #fed7e2;
  color: rgba(254, 215, 226, var(--placeholder-opacity));
}
.placeholder-pink-300:-ms-input-placeholder, 
.placeholder-pink-300::-ms-input-placeholder, 
.placeholder-pink-300::placeholder {
  --placeholder-opacity: 1;
  color: #fbb6ce;
  color: rgba(251, 182, 206, var(--placeholder-opacity));
}
.placeholder-pink-400:-ms-input-placeholder, 
.placeholder-pink-400::-ms-input-placeholder, 
.placeholder-pink-400::placeholder {
  --placeholder-opacity: 1;
  color: #f687b3;
  color: rgba(246, 135, 179, var(--placeholder-opacity));
}
.placeholder-pink-500:-ms-input-placeholder, 
.placeholder-pink-500::-ms-input-placeholder, 
.placeholder-pink-500::placeholder {
  --placeholder-opacity: 1;
  color: #ed64a6;
  color: rgba(237, 100, 166, var(--placeholder-opacity));
}
.placeholder-pink-600:-ms-input-placeholder, 
.placeholder-pink-600::-ms-input-placeholder, 
.placeholder-pink-600::placeholder {
  --placeholder-opacity: 1;
  color: #d53f8c;
  color: rgba(213, 63, 140, var(--placeholder-opacity));
}
.placeholder-pink-700:-ms-input-placeholder, 
.placeholder-pink-700::-ms-input-placeholder, 
.placeholder-pink-700::placeholder {
  --placeholder-opacity: 1;
  color: #b83280;
  color: rgba(184, 50, 128, var(--placeholder-opacity));
}
.placeholder-pink-800:-ms-input-placeholder, 
.placeholder-pink-800::-ms-input-placeholder, 
.placeholder-pink-800::placeholder {
  --placeholder-opacity: 1;
  color: #97266d;
  color: rgba(151, 38, 109, var(--placeholder-opacity));
}
.placeholder-pink-900:-ms-input-placeholder, 
.placeholder-pink-900::-ms-input-placeholder, 
.placeholder-pink-900::placeholder {
  --placeholder-opacity: 1;
  color: #702459;
  color: rgba(112, 36, 89, var(--placeholder-opacity));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Placeholder Opacity", () => {
  const css = new Set([
    "placeholder-opacity-0",
    "placeholder-opacity-25",
    "placeholder-opacity-33",
    "placeholder-opacity-50",
    "placeholder-opacity-75",
    "placeholder-opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.placeholder-opacity-0:-ms-input-placeholder, 
.placeholder-opacity-0::-ms-input-placeholder, 
.placeholder-opacity-0::placeholder {
  --placeholder-opacity: 0;
}
.placeholder-opacity-25:-ms-input-placeholder, 
.placeholder-opacity-25::-ms-input-placeholder, 
.placeholder-opacity-25::placeholder {
  --placeholder-opacity: 0.25;
}
.placeholder-opacity-33:-ms-input-placeholder, 
.placeholder-opacity-33::-ms-input-placeholder, 
.placeholder-opacity-33::placeholder {
  --placeholder-opacity: 0.33;
}
.placeholder-opacity-50:-ms-input-placeholder, 
.placeholder-opacity-50::-ms-input-placeholder, 
.placeholder-opacity-50::placeholder {
  --placeholder-opacity: 0.5;
}
.placeholder-opacity-75:-ms-input-placeholder, 
.placeholder-opacity-75::-ms-input-placeholder, 
.placeholder-opacity-75::placeholder {
  --placeholder-opacity: 0.75;
}
.placeholder-opacity-100:-ms-input-placeholder, 
.placeholder-opacity-100::-ms-input-placeholder, 
.placeholder-opacity-100::placeholder {
  --placeholder-opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Text Alignment", () => {
  const css = new Set([
    "text-left",
    "text-center",
    "text-right",
    "text-justify",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-justify {
  text-align: justify;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Text Color", () => {
  const css = new Set([
    "text-transparent",
    "text-current",
    "text-black",
    "text-white",
    "text-gray-100",
    "text-gray-200",
    "text-gray-300",
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-gray-700",
    "text-gray-800",
    "text-gray-900",
    "text-red-100",
    "text-red-200",
    "text-red-300",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-red-700",
    "text-red-800",
    "text-red-900",
    "text-orange-100",
    "text-orange-200",
    "text-orange-300",
    "text-orange-400",
    "text-orange-500",
    "text-orange-600",
    "text-orange-700",
    "text-orange-800",
    "text-orange-900",
    "text-yellow-100",
    "text-yellow-200",
    "text-yellow-300",
    "text-yellow-400",
    "text-yellow-500",
    "text-yellow-600",
    "text-yellow-700",
    "text-yellow-800",
    "text-yellow-900",
    "text-green-100",
    "text-green-200",
    "text-green-300",
    "text-green-400",
    "text-green-500",
    "text-green-600",
    "text-green-700",
    "text-green-800",
    "text-green-900",
    "text-teal-100",
    "text-teal-200",
    "text-teal-300",
    "text-teal-400",
    "text-teal-500",
    "text-teal-600",
    "text-teal-700",
    "text-teal-800",
    "text-teal-900",
    "text-blue-100",
    "text-blue-200",
    "text-blue-300",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-blue-700",
    "text-blue-800",
    "text-blue-900",
    "text-indigo-100",
    "text-indigo-200",
    "text-indigo-300",
    "text-indigo-400",
    "text-indigo-500",
    "text-indigo-600",
    "text-indigo-700",
    "text-indigo-800",
    "text-indigo-900",
    "text-purple-100",
    "text-purple-200",
    "text-purple-300",
    "text-purple-400",
    "text-purple-500",
    "text-purple-600",
    "text-purple-700",
    "text-purple-800",
    "text-purple-900",
    "text-pink-100",
    "text-pink-200",
    "text-pink-300",
    "text-pink-400",
    "text-pink-500",
    "text-pink-600",
    "text-pink-700",
    "text-pink-800",
    "text-pink-900",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.text-transparent {
  color: transparent;
}
.text-current {
  color: currentColor;
}
.text-black {
  --text-opacity: 1;
  color: #000;
  color: rgba(0, 0, 0, var(--text-opacity));
}
.text-white {
  --text-opacity: 1;
  color: #fff;
  color: rgba(255, 255, 255, var(--text-opacity));
}
.text-gray-100 {
  --text-opacity: 1;
  color: #f7fafc;
  color: rgba(247, 250, 252, var(--text-opacity));
}
.text-gray-200 {
  --text-opacity: 1;
  color: #edf2f7;
  color: rgba(237, 242, 247, var(--text-opacity));
}
.text-gray-300 {
  --text-opacity: 1;
  color: #e2e8f0;
  color: rgba(226, 232, 240, var(--text-opacity));
}
.text-gray-400 {
  --text-opacity: 1;
  color: #cbd5e0;
  color: rgba(203, 213, 224, var(--text-opacity));
}
.text-gray-500 {
  --text-opacity: 1;
  color: #a0aec0;
  color: rgba(160, 174, 192, var(--text-opacity));
}
.text-gray-600 {
  --text-opacity: 1;
  color: #718096;
  color: rgba(113, 128, 150, var(--text-opacity));
}
.text-gray-700 {
  --text-opacity: 1;
  color: #4a5568;
  color: rgba(74, 85, 104, var(--text-opacity));
}
.text-gray-800 {
  --text-opacity: 1;
  color: #2d3748;
  color: rgba(45, 55, 72, var(--text-opacity));
}
.text-gray-900 {
  --text-opacity: 1;
  color: #1a202c;
  color: rgba(26, 32, 44, var(--text-opacity));
}
.text-red-100 {
  --text-opacity: 1;
  color: #fff5f5;
  color: rgba(255, 245, 245, var(--text-opacity));
}
.text-red-200 {
  --text-opacity: 1;
  color: #fed7d7;
  color: rgba(254, 215, 215, var(--text-opacity));
}
.text-red-300 {
  --text-opacity: 1;
  color: #feb2b2;
  color: rgba(254, 178, 178, var(--text-opacity));
}
.text-red-400 {
  --text-opacity: 1;
  color: #fc8181;
  color: rgba(252, 129, 129, var(--text-opacity));
}
.text-red-500 {
  --text-opacity: 1;
  color: #f56565;
  color: rgba(245, 101, 101, var(--text-opacity));
}
.text-red-600 {
  --text-opacity: 1;
  color: #e53e3e;
  color: rgba(229, 62, 62, var(--text-opacity));
}
.text-red-700 {
  --text-opacity: 1;
  color: #c53030;
  color: rgba(197, 48, 48, var(--text-opacity));
}
.text-red-800 {
  --text-opacity: 1;
  color: #9b2c2c;
  color: rgba(155, 44, 44, var(--text-opacity));
}
.text-red-900 {
  --text-opacity: 1;
  color: #742a2a;
  color: rgba(116, 42, 42, var(--text-opacity));
}
.text-orange-100 {
  --text-opacity: 1;
  color: #fffaf0;
  color: rgba(255, 250, 240, var(--text-opacity));
}
.text-orange-200 {
  --text-opacity: 1;
  color: #feebc8;
  color: rgba(254, 235, 200, var(--text-opacity));
}
.text-orange-300 {
  --text-opacity: 1;
  color: #fbd38d;
  color: rgba(251, 211, 141, var(--text-opacity));
}
.text-orange-400 {
  --text-opacity: 1;
  color: #f6ad55;
  color: rgba(246, 173, 85, var(--text-opacity));
}
.text-orange-500 {
  --text-opacity: 1;
  color: #ed8936;
  color: rgba(237, 137, 54, var(--text-opacity));
}
.text-orange-600 {
  --text-opacity: 1;
  color: #dd6b20;
  color: rgba(221, 107, 32, var(--text-opacity));
}
.text-orange-700 {
  --text-opacity: 1;
  color: #c05621;
  color: rgba(192, 86, 33, var(--text-opacity));
}
.text-orange-800 {
  --text-opacity: 1;
  color: #9c4221;
  color: rgba(156, 66, 33, var(--text-opacity));
}
.text-orange-900 {
  --text-opacity: 1;
  color: #7b341e;
  color: rgba(123, 52, 30, var(--text-opacity));
}
.text-yellow-100 {
  --text-opacity: 1;
  color: ivory;
  color: rgba(255, 255, 240, var(--text-opacity));
}
.text-yellow-200 {
  --text-opacity: 1;
  color: #fefcbf;
  color: rgba(254, 252, 191, var(--text-opacity));
}
.text-yellow-300 {
  --text-opacity: 1;
  color: #faf089;
  color: rgba(250, 240, 137, var(--text-opacity));
}
.text-yellow-400 {
  --text-opacity: 1;
  color: #f6e05e;
  color: rgba(246, 224, 94, var(--text-opacity));
}
.text-yellow-500 {
  --text-opacity: 1;
  color: #ecc94b;
  color: rgba(236, 201, 75, var(--text-opacity));
}
.text-yellow-600 {
  --text-opacity: 1;
  color: #d69e2e;
  color: rgba(214, 158, 46, var(--text-opacity));
}
.text-yellow-700 {
  --text-opacity: 1;
  color: #b7791f;
  color: rgba(183, 121, 31, var(--text-opacity));
}
.text-yellow-800 {
  --text-opacity: 1;
  color: #975a16;
  color: rgba(151, 90, 22, var(--text-opacity));
}
.text-yellow-900 {
  --text-opacity: 1;
  color: #744210;
  color: rgba(116, 66, 16, var(--text-opacity));
}
.text-green-100 {
  --text-opacity: 1;
  color: #f0fff4;
  color: rgba(240, 255, 244, var(--text-opacity));
}
.text-green-200 {
  --text-opacity: 1;
  color: #c6f6d5;
  color: rgba(198, 246, 213, var(--text-opacity));
}
.text-green-300 {
  --text-opacity: 1;
  color: #9ae6b4;
  color: rgba(154, 230, 180, var(--text-opacity));
}
.text-green-400 {
  --text-opacity: 1;
  color: #68d391;
  color: rgba(104, 211, 145, var(--text-opacity));
}
.text-green-500 {
  --text-opacity: 1;
  color: #48bb78;
  color: rgba(72, 187, 120, var(--text-opacity));
}
.text-green-600 {
  --text-opacity: 1;
  color: #38a169;
  color: rgba(56, 161, 105, var(--text-opacity));
}
.text-green-700 {
  --text-opacity: 1;
  color: #2f855a;
  color: rgba(47, 133, 90, var(--text-opacity));
}
.text-green-800 {
  --text-opacity: 1;
  color: #276749;
  color: rgba(39, 103, 73, var(--text-opacity));
}
.text-green-900 {
  --text-opacity: 1;
  color: #22543d;
  color: rgba(34, 84, 61, var(--text-opacity));
}
.text-teal-100 {
  --text-opacity: 1;
  color: #e6fffa;
  color: rgba(230, 255, 250, var(--text-opacity));
}
.text-teal-200 {
  --text-opacity: 1;
  color: #b2f5ea;
  color: rgba(178, 245, 234, var(--text-opacity));
}
.text-teal-300 {
  --text-opacity: 1;
  color: #81e6d9;
  color: rgba(129, 230, 217, var(--text-opacity));
}
.text-teal-400 {
  --text-opacity: 1;
  color: #4fd1c5;
  color: rgba(79, 209, 197, var(--text-opacity));
}
.text-teal-500 {
  --text-opacity: 1;
  color: #38b2ac;
  color: rgba(56, 178, 172, var(--text-opacity));
}
.text-teal-600 {
  --text-opacity: 1;
  color: #319795;
  color: rgba(49, 151, 149, var(--text-opacity));
}
.text-teal-700 {
  --text-opacity: 1;
  color: #2c7a7b;
  color: rgba(44, 122, 123, var(--text-opacity));
}
.text-teal-800 {
  --text-opacity: 1;
  color: #285e61;
  color: rgba(40, 94, 97, var(--text-opacity));
}
.text-teal-900 {
  --text-opacity: 1;
  color: #234e52;
  color: rgba(35, 78, 82, var(--text-opacity));
}
.text-blue-100 {
  --text-opacity: 1;
  color: #ebf8ff;
  color: rgba(235, 248, 255, var(--text-opacity));
}
.text-blue-200 {
  --text-opacity: 1;
  color: #bee3f8;
  color: rgba(190, 227, 248, var(--text-opacity));
}
.text-blue-300 {
  --text-opacity: 1;
  color: #90cdf4;
  color: rgba(144, 205, 244, var(--text-opacity));
}
.text-blue-400 {
  --text-opacity: 1;
  color: #63b3ed;
  color: rgba(99, 179, 237, var(--text-opacity));
}
.text-blue-500 {
  --text-opacity: 1;
  color: #4299e1;
  color: rgba(66, 153, 225, var(--text-opacity));
}
.text-blue-600 {
  --text-opacity: 1;
  color: #3182ce;
  color: rgba(49, 130, 206, var(--text-opacity));
}
.text-blue-700 {
  --text-opacity: 1;
  color: #2b6cb0;
  color: rgba(43, 108, 176, var(--text-opacity));
}
.text-blue-800 {
  --text-opacity: 1;
  color: #2c5282;
  color: rgba(44, 82, 130, var(--text-opacity));
}
.text-blue-900 {
  --text-opacity: 1;
  color: #2a4365;
  color: rgba(42, 67, 101, var(--text-opacity));
}
.text-indigo-100 {
  --text-opacity: 1;
  color: #ebf4ff;
  color: rgba(235, 244, 255, var(--text-opacity));
}
.text-indigo-200 {
  --text-opacity: 1;
  color: #c3dafe;
  color: rgba(195, 218, 254, var(--text-opacity));
}
.text-indigo-300 {
  --text-opacity: 1;
  color: #a3bffa;
  color: rgba(163, 191, 250, var(--text-opacity));
}
.text-indigo-400 {
  --text-opacity: 1;
  color: #7f9cf5;
  color: rgba(127, 156, 245, var(--text-opacity));
}
.text-indigo-500 {
  --text-opacity: 1;
  color: #667eea;
  color: rgba(102, 126, 234, var(--text-opacity));
}
.text-indigo-600 {
  --text-opacity: 1;
  color: #5a67d8;
  color: rgba(90, 103, 216, var(--text-opacity));
}
.text-indigo-700 {
  --text-opacity: 1;
  color: #4c51bf;
  color: rgba(76, 81, 191, var(--text-opacity));
}
.text-indigo-800 {
  --text-opacity: 1;
  color: #434190;
  color: rgba(67, 65, 144, var(--text-opacity));
}
.text-indigo-900 {
  --text-opacity: 1;
  color: #3c366b;
  color: rgba(60, 54, 107, var(--text-opacity));
}
.text-purple-100 {
  --text-opacity: 1;
  color: #faf5ff;
  color: rgba(250, 245, 255, var(--text-opacity));
}
.text-purple-200 {
  --text-opacity: 1;
  color: #e9d8fd;
  color: rgba(233, 216, 253, var(--text-opacity));
}
.text-purple-300 {
  --text-opacity: 1;
  color: #d6bcfa;
  color: rgba(214, 188, 250, var(--text-opacity));
}
.text-purple-400 {
  --text-opacity: 1;
  color: #b794f4;
  color: rgba(183, 148, 244, var(--text-opacity));
}
.text-purple-500 {
  --text-opacity: 1;
  color: #9f7aea;
  color: rgba(159, 122, 234, var(--text-opacity));
}
.text-purple-600 {
  --text-opacity: 1;
  color: #805ad5;
  color: rgba(128, 90, 213, var(--text-opacity));
}
.text-purple-700 {
  --text-opacity: 1;
  color: #6b46c1;
  color: rgba(107, 70, 193, var(--text-opacity));
}
.text-purple-800 {
  --text-opacity: 1;
  color: #553c9a;
  color: rgba(85, 60, 154, var(--text-opacity));
}
.text-purple-900 {
  --text-opacity: 1;
  color: #44337a;
  color: rgba(68, 51, 122, var(--text-opacity));
}
.text-pink-100 {
  --text-opacity: 1;
  color: #fff5f7;
  color: rgba(255, 245, 247, var(--text-opacity));
}
.text-pink-200 {
  --text-opacity: 1;
  color: #fed7e2;
  color: rgba(254, 215, 226, var(--text-opacity));
}
.text-pink-300 {
  --text-opacity: 1;
  color: #fbb6ce;
  color: rgba(251, 182, 206, var(--text-opacity));
}
.text-pink-400 {
  --text-opacity: 1;
  color: #f687b3;
  color: rgba(246, 135, 179, var(--text-opacity));
}
.text-pink-500 {
  --text-opacity: 1;
  color: #ed64a6;
  color: rgba(237, 100, 166, var(--text-opacity));
}
.text-pink-600 {
  --text-opacity: 1;
  color: #d53f8c;
  color: rgba(213, 63, 140, var(--text-opacity));
}
.text-pink-700 {
  --text-opacity: 1;
  color: #b83280;
  color: rgba(184, 50, 128, var(--text-opacity));
}
.text-pink-800 {
  --text-opacity: 1;
  color: #97266d;
  color: rgba(151, 38, 109, var(--text-opacity));
}
.text-pink-900 {
  --text-opacity: 1;
  color: #702459;
  color: rgba(112, 36, 89, var(--text-opacity));
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Text Opacity", () => {
  const css = new Set([
    "text-opacity-0",
    "text-opacity-25",
    "text-opacity-33",
    "text-opacity-50",
    "text-opacity-75",
    "text-opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.text-opacity-0 {
  --text-opacity: 0;
}
.text-opacity-25 {
  --text-opacity: 0.25;
}
.text-opacity-33 {
  --text-opacity: 0.33;
}
.text-opacity-50 {
  --text-opacity: 0.5;
}
.text-opacity-75 {
  --text-opacity: 0.75;
}
.text-opacity-100 {
  --text-opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Text Decoration", () => {
  const css = new Set([
    "underline",
    "line-through",
    "no-underline",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.underline {
  text-decoration: underline;
}
.line-through {
  text-decoration: line-through;
}
.no-underline {
  text-decoration: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Text Transform", () => {
  const css = new Set([
    "uppercase",
    "lowercase",
    "capitalize",
    "normal-case",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.uppercase {
  text-transform: uppercase;
}
.lowercase {
  text-transform: lowercase;
}
.capitalize {
  text-transform: capitalize;
}
.normal-case {
  text-transform: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Vertical Alignment", () => {
  const css = new Set([
    "align-baseline",
    "align-top",
    "align-middle",
    "align-bottom",
    "align-text-top",
    "align-text-bottom",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.align-baseline {
  vertical-align: baseline;
}
.align-top {
  vertical-align: top;
}
.align-middle {
  vertical-align: middle;
}
.align-bottom {
  vertical-align: bottom;
}
.align-text-top {
  vertical-align: text-top;
}
.align-text-bottom {
  vertical-align: text-bottom;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Whitespace", () => {
  const css = new Set([
    "whitespace-normal",
    "whitespace-no-wrap",
    "whitespace-pre",
    "whitespace-pre-line",
    "whitespace-pre-wrap",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.whitespace-normal {
  white-space: normal;
}
.whitespace-no-wrap {
  white-space: nowrap;
}
.whitespace-pre {
  white-space: pre;
}
.whitespace-pre-line {
  white-space: pre-line;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Word Break", () => {
  const css = new Set([
    "break-normal",
    "break-words",
    "break-all",
    "truncate",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.break-normal {
  overflow-wrap: normal
  word-break: normal;
}
.break-words {
  overflow-wrap: break-word
}
.break-all {
  word-break: break-all
}
.truncate {
  overflow: hidden
  text-overflow: ellipsis;
  white-space: nowrap;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

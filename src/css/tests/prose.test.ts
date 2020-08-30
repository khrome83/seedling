import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Prose", () => {
  const css = new Set([
    "prose",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.prose {
  color: #374151;
  max-width: 65ch;
}
.prose [class~="lead"] {
  color: #4b5563;
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.prose a {
  color: #5850ec;
  text-decoration: none;
  font-weight: 600;
}
.prose strong {
  color: #161e2e;
  font-weight: 600;
}
.prose ol {
  counter-reset: list-counter;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.prose ol > li {
  position: relative;
  counter-increment: list-counter;
  padding-left: 1.75em;
}
.prose ol > li::before {
  content: counter(list-counter) ".";
  position: absolute;
  font-weight: 400;
  color: #6b7280;
}
.prose ul > li {
  position: relative;
  padding-left: 1.75em;
}
.prose ul > li::before {
  content: "";
  position: absolute;
  background-color: #d2d6dc;
  border-radius: 50%;
  width: 0.375em;
  height: 0.375em;
  top: calc(0.875em - 0.1875em);
  left: 0.25em;
}
.prose hr {
  border-color: #e5e7eb;
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.prose blockquote {
  font-weight: 500;
  font-style: italic;
  color: #161e2e;
  border-left-width: 0.25rem;
  border-left-color: #e5e7eb;
  quotes: "\\201C""\\201D""\\2018""\\2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
}
.prose blockquote p:first-of-type::before {
  content: open-quote;
}
.prose blockquote p:last-of-type::after {
  content: close-quote;
}
.prose h1 {
  color: #1a202c;
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.prose h2 {
  color: #1a202c;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.prose h3 {
  color: #1a202c;
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.prose h4 {
  color: #1a202c;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.prose figure figcaption {
  color: #6b7280;
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.prose code {
  color: #161e2e;
  font-weight: 600;
  font-size: 0.875em;
}
.prose code::before {
  content: "\`";
}
.prose code::after {
  content: "\`";
}
.prose pre {
  color: #e5e7eb;
  background-color: #252f3f;
  overflow-x: auto;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-right: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-left: 1.1428571em;
}
.prose pre code {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: 400;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.prose pre code::before {
  content: "";
}
.prose pre code::after {
  content: "";
}
.prose table {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.prose thead {
  color: #161e2e;
  font-weight: 600;
  border-bottom-width: 1px;
  border-bottom-color: #d2d6dc;
}
.prose thead th {
  vertical-align: bottom;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}
.prose tbody tr {
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
}
.prose tbody tr:last-child {
  border-bottom-width: 0;
}
.prose tbody td {
  vertical-align: top;
  padding-top: 0.5714286em;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}
.prose {
  font-size: 1rem;
  line-height: 1.75;
}
.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.prose img {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose video {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose figure {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose figure > * {
  margin-top: 0;
  margin-bottom: 0;
}
.prose h2 code {
  font-size: 0.875em;
}
.prose h3 code {
  font-size: 0.9em;
}
.prose ul {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.prose ol > li:before {
  left: 0;
}
.prose > ul > li p {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.prose > ul > li > :first-child {
  margin-top: 1.25em;
}
.prose > ul > li > :last-child {
  margin-bottom: 1.25em;
}
.prose > ol > li > :first-child {
  margin-top: 1.25em;
}
.prose > ol > li > :last-child {
  margin-bottom: 1.25em;
}
.prose ol ol,
.prose ol ul,
.prose ul ol,
.prose ul ul {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.prose hr + * {
  margin-top: 0;
}
.prose h2 + * {
  margin-top: 0;
}
.prose h3 + * {
  margin-top: 0;
}
.prose h4 + * {
  margin-top: 0;
}
.prose thead th:first-child {
  padding-left: 0;
}
.prose thead th:last-child {
  padding-right: 0;
}
.prose tbody td:first-child {
  padding-left: 0;
}
.prose tbody td:last-child {
  padding-right: 0;
}
.prose > :first-child {
  margin-top: 0;
}
.prose > :last-child {
  margin-bottom: 0;
}
.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: #161e2e;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Prose SM", () => {
  const css = new Set([
    "prose-sm",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.prose-sm p {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.prose-sm [class~="lead"] {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.prose-sm blockquote {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-left: 1.1111111em;
}
.prose-sm h1 {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.prose-sm h2 {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.prose-sm h3 {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.prose-sm h4 {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.prose-sm img {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.prose-sm video {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.prose-sm figure {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.prose-sm figure > * {
  margin-top: 0;
  margin-bottom: 0;
}
.prose-sm figure figcaption {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.prose-sm code {
  font-size: 0.8571429em;
}
.prose-sm h2 code {
  font-size: 0.9em;
}
.prose-sm h3 code {
  font-size: 0.8888889em;
}
.prose-sm pre {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-right: 1em;
  padding-bottom: 0.6666667em;
  padding-left: 1em;
}
.prose-sm ol {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.prose-sm ul {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.prose-sm li {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.prose-sm ol > li {
  padding-left: 1.5714286em;
}
.prose-sm ol > li:before {
  left: 0;
}
.prose-sm ul > li {
  padding-left: 1.5714286em;
}
.prose-sm ul > li::before {
  height: 0.3571429em;
  width: 0.3571429em;
  top: calc(0.8571429em - 0.1785714em);
  left: 0.2142857em;
}
.prose-sm > ul > li p {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.prose-sm > ul > li > :first-child {
  margin-top: 1.1428571em;
}
.prose-sm > ul > li > :last-child {
  margin-bottom: 1.1428571em;
}
.prose-sm > ol > li > :first-child {
  margin-top: 1.1428571em;
}
.prose-sm > ol > li > :last-child {
  margin-bottom: 1.1428571em;
}
.prose-sm ol ol,
.prose-sm ol ul,
.prose-sm ul ol,
.prose-sm ul ul {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.prose-sm hr {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.prose-sm hr + * {
  margin-top: 0;
}
.prose-sm h2 + * {
  margin-top: 0;
}
.prose-sm h3 + * {
  margin-top: 0;
}
.prose-sm h4 + * {
  margin-top: 0;
}
.prose-sm table {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.prose-sm thead th {
  padding-right: 1em;
  padding-bottom: 0.6666667em;
  padding-left: 1em;
}
.prose-sm thead th:first-child {
  padding-left: 0;
}
.prose-sm thead th:last-child {
  padding-right: 0;
}
.prose-sm tbody td {
  padding-top: 0.6666667em;
  padding-right: 1em;
  padding-bottom: 0.6666667em;
  padding-left: 1em;
}
.prose-sm tbody td:first-child {
  padding-left: 0;
}
.prose-sm tbody td:last-child {
  padding-right: 0;
}
.prose-sm > :first-child {
  margin-top: 0;
}
.prose-sm > :last-child {
  margin-bottom: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Prose LG", () => {
  const css = new Set([
    "prose-lg",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.prose-lg {
  font-size: 1.125rem;
  line-height: 1.7777778;
}
.prose-lg p {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-lg [class~="lead"] {
  font-size: 1.2222222em;
  line-height: 1.4545455;
  margin-top: 1.0909091em;
  margin-bottom: 1.0909091em;
}
.prose-lg blockquote {
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  padding-left: 1em;
}
.prose-lg h1 {
  font-size: 2.6666667em;
  margin-top: 0;
  margin-bottom: 0.8333333em;
  line-height: 1;
}
.prose-lg h2 {
  font-size: 1.6666667em;
  margin-top: 1.8666667em;
  margin-bottom: 1.0666667em;
  line-height: 1.3333333;
}
.prose-lg h3 {
  font-size: 1.3333333em;
  margin-top: 1.6666667em;
  margin-bottom: 0.6666667em;
  line-height: 1.5;
}
.prose-lg h4 {
  margin-top: 1.7777778em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.prose-lg img {
  margin-top: 1.7777778em;
  margin-bottom: 1.7777778em;
}
.prose-lg video {
  margin-top: 1.7777778em;
  margin-bottom: 1.7777778em;
}
.prose-lg figure {
  margin-top: 1.7777778em;
  margin-bottom: 1.7777778em;
}
.prose-lg figure > * {
  margin-top: 0;
  margin-bottom: 0;
}
.prose-lg figure figcaption {
  font-size: 0.8888889em;
  line-height: 1.5;
  margin-top: 1em;
}
.prose-lg code {
  font-size: 0.8888889em;
}
.prose-lg h2 code {
  font-size: 0.8666667em;
}
.prose-lg h3 code {
  font-size: 0.875em;
}
.prose-lg pre {
  font-size: 0.8888889em;
  line-height: 1.75;
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.375rem;
  padding-top: 1em;
  padding-right: 1.5em;
  padding-bottom: 1em;
  padding-left: 1.5em;
}
.prose-lg ol {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-lg ul {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-lg li {
  margin-top: 0.6666667em;
  margin-bottom: 0.6666667em;
}
.prose-lg ol > li {
  padding-left: 1.6666667em;
}
.prose-lg ol > li:before {
  left: 0;
}
.prose-lg ul > li {
  padding-left: 1.6666667em;
}
.prose-lg ul > li::before {
  width: 0.3333333em;
  height: 0.3333333em;
  top: calc(0.8888889em - 0.1666667em);
  left: 0.2222222em;
}
.prose-lg > ul > li p {
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.prose-lg > ul > li > :first-child {
  margin-top: 1.3333333em;
}
.prose-lg > ul > li > :last-child {
  margin-bottom: 1.3333333em;
}
.prose-lg > ol > li > :first-child {
  margin-top: 1.3333333em;
}
.prose-lg > ol > li > :last-child {
  margin-bottom: 1.3333333em;
}
.prose-lg ol ol,
.prose-lg ol ul,
.prose-lg ul ol,
.prose-lg ul ul {
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.prose-lg hr {
  margin-top: 3.1111111em;
  margin-bottom: 3.1111111em;
}
.prose-lg hr + * {
  margin-top: 0;
}
.prose-lg h2 + * {
  margin-top: 0;
}
.prose-lg h3 + * {
  margin-top: 0;
}
.prose-lg h4 + * {
  margin-top: 0;
}
.prose-lg table {
  font-size: 0.8888889em;
  line-height: 1.5;
}
.prose-lg thead th {
  padding-right: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.75em;
}
.prose-lg thead th:first-child {
  padding-left: 0;
}
.prose-lg thead th:last-child {
  padding-right: 0;
}
.prose-lg tbody td {
  padding-top: 0.75em;
  padding-right: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.75em;
}
.prose-lg tbody td:first-child {
  padding-left: 0;
}
.prose-lg tbody td:last-child {
  padding-right: 0;
}
.prose-lg > :first-child {
  margin-top: 0;
}
.prose-lg > :last-child {
  margin-bottom: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Prose XL", () => {
  const css = new Set([
    "prose-xl",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.prose-xl {
  font-size: 1.25rem;
  line-height: 1.8;
}
.prose-xl p {
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.prose-xl [class~="lead"] {
  font-size: 1.2em;
  line-height: 1.5;
  margin-top: 1em;
  margin-bottom: 1em;
}
.prose-xl blockquote {
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1.0666667em;
}
.prose-xl h1 {
  font-size: 2.8em;
  margin-top: 0;
  margin-bottom: 0.8571429em;
  line-height: 1;
}
.prose-xl h2 {
  font-size: 1.8em;
  margin-top: 1.5555556em;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.prose-xl h3 {
  font-size: 1.5em;
  margin-top: 1.6em;
  margin-bottom: 0.6666667em;
  line-height: 1.3333333;
}
.prose-xl h4 {
  margin-top: 1.8em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.prose-xl img {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-xl video {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-xl figure {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-xl figure > * {
  margin-top: 0;
  margin-bottom: 0;
}
.prose-xl figure figcaption {
  font-size: 0.9em;
  line-height: 1.5555556;
  margin-top: 1em;
}
.prose-xl code {
  font-size: 0.9em;
}
.prose-xl h2 code {
  font-size: 0.8611111em;
}
.prose-xl h3 code {
  font-size: 0.9em;
}
.prose-xl pre {
  font-size: 0.9em;
  line-height: 1.7777778;
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
  padding-top: 1.1111111em;
  padding-right: 1.3333333em;
  padding-bottom: 1.1111111em;
  padding-left: 1.3333333em;
}
.prose-xl ol {
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.prose-xl ul {
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.prose-xl li {
  margin-top: 0.6em;
  margin-bottom: 0.6em;
}
.prose-xl ol > li {
  padding-left: 1.8em;
}
.prose-xl ol > li:before {
  left: 0;
}
.prose-xl ul > li {
  padding-left: 1.8em;
}
.prose-xl ul > li::before {
  width: 0.35em;
  height: 0.35em;
  top: calc(0.9em - 0.175em);
  left: 0.25em;
}
.prose-xl > ul > li p {
  margin-top: 0.8em;
  margin-bottom: 0.8em;
}
.prose-xl > ul > li > :first-child {
  margin-top: 1.2em;
}
.prose-xl > ul > li > :last-child {
  margin-bottom: 1.2em;
}
.prose-xl > ol > li > :first-child {
  margin-top: 1.2em;
}
.prose-xl > ol > li > :last-child {
  margin-bottom: 1.2em;
}
.prose-xl ol ol,
.prose-xl ol ul,
.prose-xl ul ol,
.prose-xl ul ul {
  margin-top: 0.8em;
  margin-bottom: 0.8em;
}
.prose-xl hr {
  margin-top: 2.8em;
  margin-bottom: 2.8em;
}
.prose-xl hr + * {
  margin-top: 0;
}
.prose-xl h2 + * {
  margin-top: 0;
}
.prose-xl h3 + * {
  margin-top: 0;
}
.prose-xl h4 + * {
  margin-top: 0;
}
.prose-xl table {
  font-size: 0.9em;
  line-height: 1.5555556;
}
.prose-xl thead th {
  padding-right: 0.6666667em;
  padding-bottom: 0.8888889em;
  padding-left: 0.6666667em;
}
.prose-xl thead th:first-child {
  padding-left: 0;
}
.prose-xl thead th:last-child {
  padding-right: 0;
}
.prose-xl tbody td {
  padding-top: 0.8888889em;
  padding-right: 0.6666667em;
  padding-bottom: 0.8888889em;
  padding-left: 0.6666667em;
}
.prose-xl tbody td:first-child {
  padding-left: 0;
}
.prose-xl tbody td:last-child {
  padding-right: 0;
}
.prose-xl > :first-child {
  margin-top: 0;
}
.prose-xl > :last-child {
  margin-bottom: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Prose 2XL", () => {
  const css = new Set([
    "prose-2xl",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.prose-2xl {
  font-size: 1.5rem;
  line-height: 1.6666667;
}
.prose-2xl p {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-2xl [class~="lead"] {
  font-size: 1.25em;
  line-height: 1.4666667;
  margin-top: 1.0666667em;
  margin-bottom: 1.0666667em;
}
.prose-2xl blockquote {
  margin-top: 1.7777778em;
  margin-bottom: 1.7777778em;
  padding-left: 1.1111111em;
}
.prose-2xl h1 {
  font-size: 2.6666667em;
  margin-top: 0;
  margin-bottom: 0.875em;
  line-height: 1;
}
.prose-2xl h2 {
  font-size: 2em;
  margin-top: 1.5em;
  margin-bottom: 0.8333333em;
  line-height: 1.0833333;
}
.prose-2xl h3 {
  font-size: 1.5em;
  margin-top: 1.5555556em;
  margin-bottom: 0.6666667em;
  line-height: 1.2222222;
}
.prose-2xl h4 {
  margin-top: 1.6666667em;
  margin-bottom: 0.6666667em;
  line-height: 1.5;
}
.prose-2xl img {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-2xl video {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-2xl figure {
  margin-top: 2em;
  margin-bottom: 2em;
}
.prose-2xl figure > * {
  margin-top: 0;
  margin-bottom: 0;
}
.prose-2xl figure figcaption {
  font-size: 0.8333333em;
  line-height: 1.6;
  margin-top: 1em;
}
.prose-2xl code {
  font-size: 0.8333333em;
}
.prose-2xl h2 code {
  font-size: 0.875em;
}
.prose-2xl h3 code {
  font-size: 0.8888889em;
}
.prose-2xl pre {
  font-size: 0.8333333em;
  line-height: 1.8;
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
  padding-top: 1.2em;
  padding-right: 1.6em;
  padding-bottom: 1.2em;
  padding-left: 1.6em;
}
.prose-2xl ol {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-2xl ul {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
}
.prose-2xl li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.prose-2xl ol > li {
  padding-left: 1.6666667em;
}
.prose-2xl ol > li:before {
  left: 0;
}
.prose-2xl ul > li {
  padding-left: 1.6666667em;
}
.prose-2xl ul > li::before {
  width: 0.3333333em;
  height: 0.3333333em;
  top: calc(0.8333333em - 0.1666667em);
  left: 0.25em;
}
.prose-2xl > ul > li p {
  margin-top: 0.8333333em;
  margin-bottom: 0.8333333em;
}
.prose-2xl > ul > li > :first-child {
  margin-top: 1.3333333em;
}
.prose-2xl > ul > li > :last-child {
  margin-bottom: 1.3333333em;
}
.prose-2xl > ol > li > :first-child {
  margin-top: 1.3333333em;
}
.prose-2xl > ol > li > :last-child {
  margin-bottom: 1.3333333em;
}
.prose-2xl ol ol,
.prose-2xl ol ul,
.prose-2xl ul ol,
.prose-2xl ul ul {
  margin-top: 0.6666667em;
  margin-bottom: 0.6666667em;
}
.prose-2xl hr {
  margin-top: 3em;
  margin-bottom: 3em;
}
.prose-2xl hr + * {
  margin-top: 0;
}
.prose-2xl h2 + * {
  margin-top: 0;
}
.prose-2xl h3 + * {
  margin-top: 0;
}
.prose-2xl h4 + * {
  margin-top: 0;
}
.prose-2xl table {
  font-size: 0.8333333em;
  line-height: 1.4;
}
.prose-2xl thead th {
  padding-right: 0.6em;
  padding-bottom: 0.8em;
  padding-left: 0.6em;
}
.prose-2xl thead th:first-child {
  padding-left: 0;
}
.prose-2xl thead th:last-child {
  padding-right: 0;
}
.prose-2xl tbody td {
  padding-top: 0.8em;
  padding-right: 0.6em;
  padding-bottom: 0.8em;
  padding-left: 0.6em;
}
.prose-2xl tbody td:first-child {
  padding-left: 0;
}
.prose-2xl tbody td:last-child {
  padding-right: 0;
}
.prose-2xl > :first-child {
  margin-top: 0;
}
.prose-2xl > :last-child {
  margin-bottom: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Prose (w/ breakpoint)", () => {
  const css = new Set([
    "sm:p-4",
    "sm:prose",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
@media (min-width: 640px) {
  .sm\\:p-4 {
    padding: 1rem;
  }
  .sm\\:prose {
    color: #374151;
    max-width: 65ch;
  }
  .sm\\:prose [class~="lead"] {
    color: #4b5563;
    font-size: 1.25em;
    line-height: 1.6;
    margin-top: 1.2em;
    margin-bottom: 1.2em;
  }
  .sm\\:prose a {
    color: #5850ec;
    text-decoration: none;
    font-weight: 600;
  }
  .sm\\:prose strong {
    color: #161e2e;
    font-weight: 600;
  }
  .sm\\:prose ol {
    counter-reset: list-counter;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  .sm\\:prose ol > li {
    position: relative;
    counter-increment: list-counter;
    padding-left: 1.75em;
  }
  .sm\\:prose ol > li::before {
    content: counter(list-counter) ".";
    position: absolute;
    font-weight: 400;
    color: #6b7280;
  }
  .sm\\:prose ul > li {
    position: relative;
    padding-left: 1.75em;
  }
  .sm\\:prose ul > li::before {
    content: "";
    position: absolute;
    background-color: #d2d6dc;
    border-radius: 50%;
    width: 0.375em;
    height: 0.375em;
    top: calc(0.875em - 0.1875em);
    left: 0.25em;
  }
  .sm\\:prose hr {
    border-color: #e5e7eb;
    border-top-width: 1px;
    margin-top: 3em;
    margin-bottom: 3em;
  }
  .sm\\:prose blockquote {
    font-weight: 500;
    font-style: italic;
    color: #161e2e;
    border-left-width: 0.25rem;
    border-left-color: #e5e7eb;
    quotes: "\\201C""\\201D""\\2018""\\2019";
    margin-top: 1.6em;
    margin-bottom: 1.6em;
    padding-left: 1em;
  }
  .sm\\:prose blockquote p:first-of-type::before {
    content: open-quote;
  }
  .sm\\:prose blockquote p:last-of-type::after {
    content: close-quote;
  }
  .sm\\:prose h1 {
    color: #1a202c;
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: 0.8888889em;
    line-height: 1.1111111;
  }
  .sm\\:prose h2 {
    color: #1a202c;
    font-weight: 700;
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3333333;
  }
  .sm\\:prose h3 {
    color: #1a202c;
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    line-height: 1.6;
  }
  .sm\\:prose h4 {
    color: #1a202c;
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    line-height: 1.5;
  }
  .sm\\:prose figure figcaption {
    color: #6b7280;
    font-size: 0.875em;
    line-height: 1.4285714;
    margin-top: 0.8571429em;
  }
  .sm\\:prose code {
    color: #161e2e;
    font-weight: 600;
    font-size: 0.875em;
  }
  .sm\\:prose code::before {
    content: "\`";
  }
  .sm\\:prose code::after {
    content: "\`";
  }
  .sm\\:prose pre {
    color: #e5e7eb;
    background-color: #252f3f;
    overflow-x: auto;
    font-size: 0.875em;
    line-height: 1.7142857;
    margin-top: 1.7142857em;
    margin-bottom: 1.7142857em;
    border-radius: 0.375rem;
    padding-top: 0.8571429em;
    padding-right: 1.1428571em;
    padding-bottom: 0.8571429em;
    padding-left: 1.1428571em;
  }
  .sm\\:prose pre code {
    background-color: transparent;
    border-width: 0;
    border-radius: 0;
    padding: 0;
    font-weight: 400;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }
  .sm\\:prose pre code::before {
    content: "";
  }
  .sm\\:prose pre code::after {
    content: "";
  }
  .sm\\:prose table {
    width: 100%;
    table-layout: auto;
    text-align: left;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.875em;
    line-height: 1.7142857;
  }
  .sm\\:prose thead {
    color: #161e2e;
    font-weight: 600;
    border-bottom-width: 1px;
    border-bottom-color: #d2d6dc;
  }
  .sm\\:prose thead th {
    vertical-align: bottom;
    padding-right: 0.5714286em;
    padding-bottom: 0.5714286em;
    padding-left: 0.5714286em;
  }
  .sm\\:prose tbody tr {
    border-bottom-width: 1px;
    border-bottom-color: #e5e7eb;
  }
  .sm\\:prose tbody tr:last-child {
    border-bottom-width: 0;
  }
  .sm\\:prose tbody td {
    vertical-align: top;
    padding-top: 0.5714286em;
    padding-right: 0.5714286em;
    padding-bottom: 0.5714286em;
    padding-left: 0.5714286em;
  }
  .sm\\:prose {
    font-size: 1rem;
    line-height: 1.75;
  }
  .sm\\:prose p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  .sm\\:prose img {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .sm\\:prose video {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .sm\\:prose figure {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .sm\\:prose figure > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  .sm\\:prose h2 code {
    font-size: 0.875em;
  }
  .sm\\:prose h3 code {
    font-size: 0.9em;
  }
  .sm\\:prose ul {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  .sm\\:prose li {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .sm\\:prose ol > li:before {
    left: 0;
  }
  .sm\\:prose > ul > li p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
  .sm\\:prose > ul > li > :first-child {
    margin-top: 1.25em;
  }
  .sm\\:prose > ul > li > :last-child {
    margin-bottom: 1.25em;
  }
  .sm\\:prose > ol > li > :first-child {
    margin-top: 1.25em;
  }
  .sm\\:prose > ol > li > :last-child {
    margin-bottom: 1.25em;
  }
  .sm\\:prose ol ol,
  .sm\\:prose ol ul,
  .sm\\:prose ul ol,
  .sm\\:prose ul ul {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
  .sm\\:prose hr + * {
    margin-top: 0;
  }
  .sm\\:prose h2 + * {
    margin-top: 0;
  }
  .sm\\:prose h3 + * {
    margin-top: 0;
  }
  .sm\\:prose h4 + * {
    margin-top: 0;
  }
  .sm\\:prose thead th:first-child {
    padding-left: 0;
  }
  .sm\\:prose thead th:last-child {
    padding-right: 0;
  }
  .sm\\:prose tbody td:first-child {
    padding-left: 0;
  }
  .sm\\:prose tbody td:last-child {
    padding-right: 0;
  }
  .sm\\:prose > :first-child {
    margin-top: 0;
  }
  .sm\\:prose > :last-child {
    margin-bottom: 0;
  }
  .sm\\:prose h1,
  .sm\\:prose h2,
  .sm\\:prose h3,
  .sm\\:prose h4 {
    color: #161e2e;
  }
}
  `;

  assertEquals(output.trim(), expected.trim());
});

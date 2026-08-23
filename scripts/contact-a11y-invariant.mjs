#!/usr/bin/env node
// Fails any reintroduction of the defect that the 23.8.2026 conflict was decided on.
//
// THE INVARIANT: a live region created at the same moment as its text is
// frequently not announced at all. The region must exist in the document
// BEFORE it has content; the content is injected into it afterwards.
//
// This is a STATIC check and it is deliberately narrow. It cannot tell you
// that an announcement is actually heard — only that the shape which reliably
// prevents one is absent. Read it as "the known-bad pattern is not here",
// never as "the form is announced correctly".
//
// Adjudication: ~/.claude/workroom/contact-conflict-adjudication-2026-08-23.md
//
// Usage:  node scripts/contact-a11y-invariant.mjs [path/to/Contact.tsx]
// Exit 0 = invariant holds. Exit 1 = violated. Exit 2 = could not check.

import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? 'src/components/Contact.tsx';

let src;
try {
  src = readFileSync(file, 'utf8');
} catch (e) {
  // Fail closed and loud: "I could not look" must never read as "it is fine".
  console.error(`contact-a11y-invariant: CANNOT CHECK ${file} — ${e.message}`);
  process.exit(2);
}

const violations = [];

// 1. The error component must not bail out before rendering its region.
//    `if (!children) return null` is the exact shape that was rejected: the
//    element and its text come into being together.
if (/if\s*\(\s*!\s*(children|message|error)\s*\)\s*return\s+null/.test(src)) {
  violations.push(
    'an error component returns null when it has no text, so its region is ' +
    'created together with its content — the pattern that reliably fails to announce'
  );
}

// 2. aria-describedby must be unconditional. A pointer that appears at the same
//    instant as its target has the same defect one level up.
// Two syntaxes, because the first version of this check missed the second and
// passed a file that had the pattern: a JSX attribute with a ternary, and a
// spread-object built by a conditional helper. Non-coverage read as clean.
const conditionalDescribedBy = [
  ...(src.match(/aria-describedby=\{[^}]*\?[^}]*\}/g) ?? []),
  ...(src.match(/\?\s*\{[^}]*["']aria-describedby["']\s*:/g) ?? []),
];
if (conditionalDescribedBy.length > 0) {
  violations.push(
    `${conditionalDescribedBy.length} conditional aria-describedby — the pointer and ` +
    `its target appear in the same instant. Point at a permanently mounted node instead. ` +
    `First: ${conditionalDescribedBy[0].slice(0, 70)}`
  );
}

// 3. There must be a live region, AND it must not be only the form-level one.
//    A single role="alert" for "submission failed" says nothing about whether
//    per-field errors are announced. Measured on drumming-workshops: exactly
//    one role="alert", zero aria-live, zero aria-describedby — a form with no
//    field-level announcement at all passed this rule in its first version.
const liveRegions = (src.match(/aria-live=|role="alert"/g) ?? []).length;
const fieldWiring = (src.match(/aria-describedby/g) ?? []).length;
if (liveRegions === 0) {
  violations.push('no aria-live and no role="alert" anywhere — nothing can be announced');
} else if (fieldWiring === 0) {
  violations.push(
    `${liveRegions} live region(s) but zero aria-describedby — whatever is announced ` +
    `is not tied to any field, so a listener is told something failed and not which`
  );
}

// 4. noValidate must be present, or the browser blocks first, onSubmit never
//    runs, and every accessibility affordance below it is dead code.
if (!/noValidate/.test(src)) {
  violations.push(
    'the form does not carry noValidate, so native validation blocks first and ' +
    'the custom error handling never executes'
  );
}

if (violations.length === 0) {
  console.log(`contact-a11y-invariant: OK — ${file}`);
  console.log('  scope: the known-bad mount pattern is absent. NOT a claim that the');
  console.log('  form is announced correctly — that needs a screen reader.');
  process.exit(0);
}

console.error(`contact-a11y-invariant: VIOLATED — ${file}`);
for (const v of violations) console.error(`  ✗ ${v}`);
console.error('  see ~/.claude/workroom/contact-conflict-adjudication-2026-08-23.md');
process.exit(1);

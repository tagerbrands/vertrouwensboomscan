import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace \${...} with {...} where we are in JSX not in template literals.
// We can just find all `\${isEnglish ?` and see if they need to be replaced.
// For the HTML export block (lines 110-380ish), it's inside a template literal, so \${isEnglish ?...} is correct there.
// For JSX block (line 380 onwards), we should use {isEnglish ?...} without the $.

// split into two parts: before 'return (' and after 'return ('
const splitIndex = content.indexOf('return (');
let part1 = content.substring(0, splitIndex); // The JS code and html template literal
let part2 = content.substring(splitIndex); // The JSX

part2 = part2.replace(/\$\{isEnglish \?/g, '{isEnglish ?');

// also any other translations that were messed up:
part2 = part2.replace(/\$\{tLang/g, '{tLang'); // remove the $ from tLang accesses inside JSX too, if there are any.

fs.writeFileSync('src/App.tsx', part1 + part2);

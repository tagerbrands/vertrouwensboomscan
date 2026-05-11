import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const reps = [
  ["{isEnglish ? 'Appendix: Volledige Zelfscan' : 'Bijlage'}", "{isEnglish ? 'Appendix: Full Self-scan' : 'Bijlage: Volledige Zelfscan'}"],
  ['<span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded font-medium inline-block whitespace-nowrap">Vergt actie</span>', '<span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded font-medium inline-block whitespace-nowrap">{tLang.vergtActie}</span>'],
  ["Actieplanning t.b.v. borgingsagenda in-/uitschakelen", "{isEnglish ? 'Enable/disable action planning for assurance agenda' : 'Actieplanning t.b.v. borgingsagenda in-/uitschakelen'}"],
];

reps.forEach(([search, replace]) => {
  content = content.replace(search, replace);
});

// Since some of that HTML gets stringified in export we have to use \${} inside template literals. 
// For "Vergt actie" inside the template literal:
content = content.replace(/>Vergt actie<\/span>/g, '>\\${tLang.vergtActie}</span>');

fs.writeFileSync('src/App.tsx', content);

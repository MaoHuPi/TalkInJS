import fs from 'fs/promises';

function convert(exampleCode) {
  exampleCode = exampleCode
    .replace('../src/', './')
    .split('\n\n')
    .map((frag) =>
      frag
        .split('\n')
        .map((row) => {
          if (row.indexOf('// ') == 0) {
            return '\t' + row.replace('// ', '');
          } else if (/\/\*(.*)\*\//.test(row)) {
            return '\t```\n\n* ' + /\/\*(.*)\*\//.exec(row)[1] + '\n\t```js';
          } else {
            return '\t' + row;
          }
        })
        .join('\n')
    )
    .join('\n');
  exampleCode = '* Import\n\n\t```js\n' + exampleCode + '\t```';
  return exampleCode;
}

let template = (await fs.readFile('./readme/template.md')).toString();
let example = (await fs.readFile('./readme/example.mjs')).toString();
example = convert(example);
let readme = template.replace('{{example}}', example);
await fs.writeFile('./README.md', readme);
console.log('done!');

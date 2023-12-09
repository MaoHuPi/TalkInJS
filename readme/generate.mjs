import fs from 'fs/promises';

function convert(exampleCode){
	exampleCode = exampleCode
		.split('\n\n')
		.map(frag => frag
			.split('\n')
			.map(row => {
				if(row.indexOf('// ') == 0){
					return '\t' + row.replace('// ', '');
				}
				else if(/\/\*(.*)\*\//.test(row)){
					return '\t```\n\n* '+ /\/\*(.*)\*\//.exec(row)[1] + '\n\t```js';
				}
				else{
					return '\t' + row;
				}
			})
			.join('\n')
		)
		.join('\n');
	exampleCode = '* Import\n\t```js\n' + exampleCode + '\n\t```';
	return exampleCode;
}

let template = (await fs.readFile('./readme/template.md')).toString();
let example = (await fs.readFile('./example.mjs')).toString();
example = convert(example);
let readme = template.replace('{{example}}', example);
await fs.writeFile('./README.md', readme);
console.log('done!');
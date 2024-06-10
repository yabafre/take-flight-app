const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, 'assets', 'images', 'airlines-logos', 'logos');
const outputFilePath = path.join(__dirname, 'src', 'utils', 'airlineLogos.js');

const files = fs.readdirSync(imageDirectory);

let importStatements = [];
let imageMap = {};

files.forEach(file => {
  const carrierCode = file.split('-')[0];
  if (!imageMap[carrierCode]) {
    imageMap[carrierCode] = {};
  }
  const size = file.split('-')[1].split('.')[0];
  const extension = file.split('.').pop();
  const importName = `logo_${carrierCode}_${size}_${extension}`;
  importStatements.push(`import ${importName} from '@assets/images/airlines-logos/logos/${file}';`);
  imageMap[carrierCode][size + (extension === 'svg' ? '_svg' : '')] = importName;
});

const generateObjectString = (obj) => {
  let str = '{\n';
  for (let key in obj) {
    str += `  "${key}": {\n`;
    for (let subKey in obj[key]) {
      str += `    "${subKey}": ${obj[key][subKey]},\n`;
    }
    str += '  },\n';
  }
  str += '}';
  return str;
};

const fileContent = `
${importStatements.join('\n')}

const airlineLogos = ${generateObjectString(imageMap)};

export default airlineLogos;
`;

fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

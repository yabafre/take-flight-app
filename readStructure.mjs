import * as path from "path"
import * as fs from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

// Obtenir le nom de fichier et le répertoire en utilisant `fileURLToPath` et `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ignoreDirs = ['.idea', '.next', '.vscode', 'node_modules', '.git', '.expo', 'android', 'ios', 'public', 'build', 'dist', 'coverage', 'tmp', 'temp', 'assets'];

function readDirectory(dir, depth = 0) {
  if (ignoreDirs.includes(path.basename(dir))) return;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`${'│   '.repeat(depth)}${chalk.blue.bold('├── /' + file)}`);
      readDirectory(fullPath, depth + 1);
    } else {
      console.log(`${'│   '.repeat(depth)}${chalk.green('├── ' + file)}`);
    }
  });
}

function printStructure(baseDir) {
  console.log(chalk.yellow(`/${path.basename(baseDir)}`));
  readDirectory(baseDir);
}

const baseDir = path.resolve(__dirname, '');
printStructure(baseDir);

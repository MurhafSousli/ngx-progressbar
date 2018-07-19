const c = require('ansi-colors');
const { join } = require('path');
const {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  writeFileSync
} = require('fs');

const getPackages = p =>
readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

const packages = getPackages('dist');

console.log(
  'Updating packages version to',
  c.cyan(c.symbols.pointerSmall),
  c.yellow(packages)
);

// Get the root from the main package.json
const version = JSON.parse(readFileSync('package.json', 'utf8')).version;

  // Updates `VERSION` in package.json for all packages
packages.map(package => {
  const packagePath = `dist/${package}/package.json`;
  // Check if package directory exists
  if (existsSync(packagePath)) {
    console.log(c.magenta(`${package}@${version}`), c.green(c.symbols.check));
    package = readFileSync(packagePath, 'utf8');
    writeFileSync(packagePath, package.replace(/VERSION/g, version));
  }
});

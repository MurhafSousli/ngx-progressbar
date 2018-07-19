const c = require('ansi-colors');
const { execSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const getPackages = p =>
readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

const packages = getPackages('dist');

console.log(
  'Publishing packages',
  c.cyan(c.symbols.pointerSmall),
  c.yellow(packages)
);

packages.map(function(package) {
  const packagePath = `${__dirname}/../dist/${package}`;
  execSync(`cd ${packagePath} && npm publish`);
  console.log(c.magenta(package), 'has been published', c.green(c.symbols.check));
});

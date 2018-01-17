const execSync = require('child_process').execSync,
  packages = [
    'core',
    'http',
    'router'
  ];

packages.map(package => {
  const packagePath = `${__dirname}/../build/${package}`;
  execSync(`cd ${packagePath} && npm publish`);
});

const execSync = require('child_process').execSync,
  packages = [
    'core',
    'http',
    'router'
  ];

packages.map(function (package) {
  const packagePath = `${__dirname}/../dist/${package}`;
  execSync(`cd ${packagePath} && npm publish`);
});

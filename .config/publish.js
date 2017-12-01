const execSync = require('child_process').execSync,
  packages = [
    'core',
    'http',
    'http-client',
    'router',
  ];

packages.map(package => {
  const packagePath = `${__dirname}/../build/${package}`;
  execSync(`cd ${packagePath} && npm publish`);
});

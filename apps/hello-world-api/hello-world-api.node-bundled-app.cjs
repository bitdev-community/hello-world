const { Ssh } = require('@greetings/development.deployers.ssh-deployer');

const config = {
  host: '<domain or ip>',
  username: '<username>',
  cwd: './api',
  privateKeyPath: '/Users/my-user/key.pem',
  runCommand: "cd api && forever stopall && nohup forever server.cjs  &> /dev/null &'"
};

/** @type {import("@greetings/hello-world.apps.node-app-type").NodeAppOptions} */
module.exports.default = {
  name: 'hello-world-api',
  entry: require.resolve('./hello-world-api.app-root'),
  deploy: Ssh.deploy(config),
  portRange: [3000, 4000],
};

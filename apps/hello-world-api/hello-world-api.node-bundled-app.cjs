const { Ssh } = require('@greetings/development.deployers.ssh-deployer');

const config = {
  host: process.env.SSH_SERVER_HOST_IP,
  username: process.env.SSH_SERVER_USERNAME,
  cwd: './api',
  privateKeyPath: process.env.SSH_PRIVATE_KEY_PATH,
  runCommand: "cd api && forever stopall && nohup forever app.cjs  &> /dev/null &'"
};

/** @type {import("@greetings/hello-world.apps.node-app-type").NodeAppOptions} */
module.exports.default = {
  name: 'hello-world-api',
  entry: require.resolve('./hello-world-api.app-root'),
  deploy: Ssh.deploy(config),
  portRange: [3000, 4000],
};

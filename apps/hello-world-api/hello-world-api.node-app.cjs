const { Ssh } = require('@greetings/development.deployers.ssh-deployer');

const config = {
  host: 'xxxx',
  username: 'xxx',
  cwd: './',
  privateKey: '/Users/<my_user>/key.pem',
  runCommand:
    'npm install && npm run build --if-present && forever stopall && nohup forever api/index.js  &> /dev/null &',
};

/** @type {import("@teambit/node").NodeAppOptions} */
module.exports.default = {
  name: 'hello-world-api',
  entry: require.resolve('./hello-world-api.app-root'),
  deploy: Ssh.deploy(config),
  portRange: [3000, 4000],
};

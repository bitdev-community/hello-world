const { Ssh } = require('@greetings/development.deployers.ssh-deployer');

const config = {
  host: '13.228.159.236',
  username: 'bitnami',
  cwd: './api',
  privateKeyPath: '/Users/ashanfernando/Workspace/lightsail-key.pem',
  runCommand: "cd api/build && node server.cjs"
};

/** @type {import("@teambit/node").NodeAppOptions} */
module.exports.default = {
  name: 'hello-world-api',
  entry: require.resolve('./hello-world-api.app-root'),
  deploy: Ssh.deploy(config),
  portRange: [3000, 4000],
};

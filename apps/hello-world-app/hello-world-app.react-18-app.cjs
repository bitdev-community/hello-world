const { Netlify } = require('@teambit/cloud-providers.deployers.netlify');
const { netlifyConfig } = require('./netlify');

module.exports.default = {
  name: 'hello-world-app',
  entry: [require.resolve('./hello-world-app.app-root')],
  deploy: Netlify.deploy(netlifyConfig),
};

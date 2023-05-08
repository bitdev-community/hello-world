const { Netlify } = require('@teambit/cloud-providers.deployers.netlify');

const netlifyConfig = {
  team: 'teambit',
  accessToken: process.env.NETLIFY_AUTH_TOKEN,
  productionSiteName: 'hello-world',
  stagingSiteName: 'hello-world-staging',
  skipLaneDeployments: false,
  useDefaultRedirectsForSPA: true,
};

module.exports.default = {
  name: 'hello-world-app',
  entry: [require.resolve('./hello-world-app.app-root')],
  deploy: Netlify.deploy(netlifyConfig),
};

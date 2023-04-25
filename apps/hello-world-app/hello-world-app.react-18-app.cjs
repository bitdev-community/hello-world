/** @type {import("@teambit/react.apps.react-app-types").ReactAppType} */
const { Netlify } = require('@teambit/cloud-providers.deployers.netlify');

const netlifyConfig = {
  accessToken: process.env.NETLIFY_AUTH_TOKEN,
  productionSiteName: 'your-site-name',
  team: 'your-team-name',
};

const netlify = new Netlify(netlifyConfig);

module.exports.default = {
  name: 'hello-world-app',
  entry: [require.resolve('./hello-world-app.app-root')],
  deploy: netlify.deploy.bind(netlify),
};

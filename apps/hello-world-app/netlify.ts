import { NetlifyOptions } from '@teambit/cloud-providers.deployers.netlify';

export const netlifyConfig: NetlifyOptions = {
  team: 'greetings',
  accessToken: process.env.NETLIFY_AUTH_TOKEN as string,
  productionSiteName: 'hello-world',
  stagingSiteName: 'hello-world-staging',
  skipLaneDeployments: false,
  useDefaultRedirectsForSPA: true,
};
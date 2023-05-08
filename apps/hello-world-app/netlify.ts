import { NetlifyOptions } from '@teambit/cloud-providers.deployers.netlify';

export const netlifyConfig: NetlifyOptions = {
  team: 'greetings-team',
  accessToken: process.env.NETLIFY_AUTH_TOKEN as string,
  productionSiteName: 'greetings-hello-world',
  stagingSiteName: 'greetings-hello-world-staging',
  skipLaneDeployments: false,
  useDefaultRedirectsForSPA: true,
};
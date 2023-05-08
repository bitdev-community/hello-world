import type { AppDeployContext, DeployFn } from '@teambit/application';
import type { Logger } from '@teambit/logger';

/**
 * the options for the node app type (not to be confused with the options for a specific node app)
 * options are passed via the 'apps' method in the env.
 * @example
 * apps(): EnvHandler<AppTypeList> {
 *   return AppTypeList.from([NodeAppType.from({name: 'my-app-plugin-extension'})]);
 * }
 */
export type NodeAppTypeOptions = {
  name?: string;
}


/**
 * these options are read from the app plugin file
 * (e.g, my-app.node-bundled-app.cjs)
 * @example
 * module.exports.default = {
 *   name: 'hello-world',
 *   entry: require.resolve('./hello-world.app-root'),
 * };
 */
export type NodeAppOptions = {
  /**
   * name of this application (not to be confused with the name of the app type)
   * @example 'hello-world'
   */
  name: string;

  /**
   * path to entry file of the application.
   * @example
   * require.resolve('./hello-world.app-root')
   */
  entry: string;

  /**
   * ranges of ports to use to run the app server.
   * @default
   * [3000, 4000]
   */
  portRange?: [number, number];


  /**
   * name for the output bundle file.
   * @default
   * 'app.js'
   */

  bundleName?: string;
  /**
   * a function to deploy the bundled app to a remote server.
   */
  deploy?: DeployFn;
};


/**
 * information about the app build for the deployer
 */
export interface DeployContext extends AppDeployContext {
  /**
   * the main file of the app
   * @default 'index.js'
   */
  mainFile?: string;
  /**
   * the path for the app's build
   * @default 'path/to/capsule/artifacts/node-app/app.js'
   */
  buildPath?: string;

  /**
   * the current logger instance
   */
  logger: Logger;
}

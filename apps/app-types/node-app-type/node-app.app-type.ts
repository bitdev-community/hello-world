import { Logger } from '@teambit/logger';
import { ApplicationType } from '@teambit/application';
import type { EnvContext, EnvHandler } from '@teambit/envs';
import { NodeApp } from './node-app.application';
import type { NodeAppOptions } from './node-app-options';
import type { NodeAppTypeOptions } from './node-app-options';

export class NodeAppType implements ApplicationType<NodeAppOptions> {
  constructor(
    /**
     * the name of the app type (app plugin file extension)
     * */ 
    readonly name: string,
    private logger: Logger) {}

  createApp(options: NodeAppOptions) {
    return new NodeApp(
      /* name for a specific app */
      options.name,
      options.entry,
      options.portRange || [3000, 4000],
      this.logger,
      options.bundleName || 'app.js',
      options.deploy,
    );
  }

  static from(appTypeOptions: NodeAppTypeOptions): EnvHandler<NodeAppType> {
    return (context: EnvContext) => {
      const name = appTypeOptions.name || 'node-bundled-app';
      const logger = context.createLogger(name);
      return new NodeAppType(name, logger);
    };
  }
}
import { execFile } from 'child_process';
import { parse, join, sep } from 'path';
import { Logger } from '@teambit/logger';
import { Application, DeployFn, AppBuildContext } from '@teambit/application';
import { Port } from '@teambit/toolbox.network.get-port';
import * as esbuild from 'esbuild'
import { DeployContext } from './node-app-options';


export class NodeApp implements Application {
  constructor(
    readonly name: string,
    readonly entry: string,
    readonly portRange: [number, number],
    readonly logger: Logger,
    readonly bundleName: string,
    readonly deploy?: DeployFn
  ) {}

  applicationType = 'node';

  async run(): Promise<number | undefined> {
    const logger = this.logger;
    const [from, to] = this.portRange;
    const port = await Port.getPort(from, to);
    const child = execFile('node', [this.entry, port.toString()], (error) => {
      if (error) {
        throw error;
      }
    });
    child.stdout?.on('data', function (data) {
      logger.console(data.toString());
    });
    return port;
  }x

  async build(context: AppBuildContext): Promise<DeployContext> {
    const logger = this.logger;
    const { base } = parse(this.entry);
    const { distDir } = context.env.getCompiler();
    const  { capsule } = context;
    const artifactsDir  = context.artifactsDir;
    const mainFile = join(distDir, base);
    const buildPath = `${capsule.path}${sep}${artifactsDir}${sep}node-app${sep}${this.bundleName}`

    /*await esbuild.build({
      entryPoints: [mainFile],
      bundle: true,
      platform: 'node',
      outfile: buildPath,
    }).catch((error) => {
      logger.consoleFailure(`node app bundling failed with the following error: ${error}`);
    });*/
    const _context = Object.assign(context, { mainFile, buildPath, logger });
    return _context;
  }
}
import { AppDeployContext } from '@teambit/application';
import { NodeSSH } from 'node-ssh';
import { build } from "esbuild";

export type SshOptions = {
  host: string;
  username: string;
  cwd: string;
  privateKeyPath?: string;
  password?: string;
  port?: number;
  entryPoint?: string;
  runCommand?: string;
};

export type DeployContext = {
  publicDir?: string;
} & AppDeployContext;

export class Ssh {
  constructor(readonly options: SshOptions) { }

  static deploy(options: SshOptions) {
    const ssh = new Ssh(options);
    return async (deployContext: DeployContext): Promise<void> => {
      await ssh.deploy(deployContext);
    };
  }

  private async deploy(context: DeployContext): Promise<void> {
    const { capsule } = context;

    const ssh = await this.sshClient;
    const remotePath = this.options.cwd;
    const entryPoint = this.options.entryPoint ?? 'index.ts';

    await ssh.execCommand(
      `sudo mkdir ${remotePath} && sudo chown $USER ${remotePath}`
    );

    await build({
      entryPoints: [capsule.fs.getPath(entryPoint)],
      outfile: `${capsule.fs.getPath('/')}build/server.cjs`,
      bundle: true,
      minify: true,
      platform: 'node'
    });

    await ssh.putDirectory(capsule.fs.getPath('build'), remotePath, {
      recursive: true,
      concurrency: 10,
    });

    const files = await ssh.execCommand(`cd ${remotePath} && ls -la`);

    console.log('\nfiles', files.stdout);

    if (this.options.runCommand) {
      const run = await ssh.execCommand(this.options.runCommand);
      console.log('\nrun', run.stdout);
    }

    ssh.dispose();
  }

  private get sshClient() {
    const ssh = new NodeSSH();
    return ssh
      .connect({
        host: this.options.host,
        username: this.options.username,
        privateKeyPath: this.options.privateKeyPath,
      })
      .then(() => {
        return ssh;
      });
  }
}

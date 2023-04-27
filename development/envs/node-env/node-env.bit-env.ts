/**
 * this env extends the default node env
 * @see https://bit.cloud/teambit/node/node
 */
import { NodeEnv } from '@teambit/node.node';
import { Compiler } from '@teambit/compiler';
import { EnvHandler } from '@teambit/envs';
import {
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
} from '@teambit/typescript.typescript-compiler';
import { AppTypeList } from '@teambit/application';
import { NodeAppType } from '@greetings/hello-world.apps.node-app-type';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTask, JestTester } from '@teambit/defender.jest-tester';
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';
import { PackageGenerator } from '@teambit/pkg';

export class MyNodeEnv extends NodeEnv {
  /* shorthand name for the environment */
  name = 'my-node-env';

  /* register the new app  */
  apps(): EnvHandler<AppTypeList> {
    return AppTypeList.from([NodeAppType.from({})]);
  }

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    /**
     * @see https://bit.dev/reference/typescript/using-typescript
     */
    return TypescriptCompiler.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      types: resolveTypes(__dirname, ['./types']),
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/node-env/build-pipelines
   */
  build() {
    return super.build().replace([
      TypescriptTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        types: resolveTypes(__dirname, ['./types']),
      }),
    ]);
  }

  package() {
    return PackageGenerator.from({
      packageJson: {
        main: 'dist/{main}.js',
        types: '{main}.ts',
        type: 'commonjs',
      },
      npmIgnore: super.npmIgnore,
    });
  }
}

export default new MyNodeEnv();

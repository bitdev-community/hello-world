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
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTask, JestTester } from '@teambit/defender.jest-tester';
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';
import { PackageGenerator } from '@teambit/pkg';

export class MyNodeEnv extends NodeEnv {
  /* shorthand name for the environment */
  name = 'my-node-env';

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

  /* the test runner to use during development */
  tester(): EnvHandler<Tester> {
    /**
     * @see https://bit.dev/reference/jest/using-jest
     */
    return JestTester.from({
      config: require.resolve('./config/jest.config'),
    });
  }

  /* the linter to use during development */
  linter() {
    /**
     * @see https://bit.dev/reference/eslint/using-eslint
     */
    return ESLintLinter.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      configPath: require.resolve('./config/eslintrc.js'),
      pluginsPath: __dirname,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    });
  }

  /**
   * the formatter to use during development
   * (source files are not formatted as part of the components' build)
   */
  formatter() {
    /**
     * @see https://bit.dev/reference/prettier/using-prettier
     */
    return PrettierFormatter.from({
      configPath: require.resolve('./config/prettier.config.js'),
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
      EslintTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        configPath: require.resolve('./config/eslintrc.js'),
        pluginsPath: __dirname,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      JestTask.from({ config: require.resolve('./config/jest.config') }),
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

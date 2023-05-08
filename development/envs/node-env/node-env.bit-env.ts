/**
 * this env extends the default node env
 * @see https://bit.cloud/teambit/node/node
 */
import { NodeEnv } from '@teambit/node.node';
import { EnvHandler } from '@teambit/envs';
import { AppTypeList } from '@teambit/application';
import { NodeAppType } from '@greetings/development.app-types.node-app-type';

export class MyNodeEnv extends NodeEnv {
  /* shorthand name for the environment */
  name = 'my-node-env';

  /* register the new app  */
  apps(): EnvHandler<AppTypeList> {
    return AppTypeList.from([NodeAppType.from({})]);
  }
}

export default new MyNodeEnv();

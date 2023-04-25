import Application from 'express';
import cors from 'cors';
import { getHelloRoute } from '@greetings/hello-world.api-routes.hello';
import { getPort } from './get-port.js';

function registerRoutes(app: Application.Application) {
  const helloRoute = getHelloRoute();
  const routes = [helloRoute];
  routes.forEach(route => {
    app[route.method](route.route, route.middlewares);
  })
}

export const expressApp = async () => {
  const app = Application();
  app.use(cors());
  const port = await getPort();
  registerRoutes(app);
  app.listen(port, () => {
    console.log(`node-app app listening on port ${port}`);// eslint-disable-line no-console
  });
};

expressApp().catch(err => {
  console.log('error from express', err);// eslint-disable-line no-console
  process.exit(1);
});

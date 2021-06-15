import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { json as bodyParserJson } from 'body-parser';
import { IConfigService, IRouteService } from '@services';
import { TYPES } from '@types';

export interface IApp {
  readonly app: Express
  listen: () => void;
}

@injectable()
export class App {
  private readonly configService: IConfigService;

  private readonly routeService: IRouteService;

  public readonly app: Express;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService,
    @inject(TYPES.RouteService) routeService: IRouteService) {
    this.configService = configService;
    this.routeService = routeService;

    this.app = express();
    this.setup();
  }

  listen = () => {
    const { port } = this.configService;
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  };

  private setup = () => {
    this.app.use(bodyParserJson());
    this.setupRoutes();
  }

  private setupRoutes = () => {
    this.routeService.setupRoutes(this.app);
  };
}

const createApp = () => {
  const app = express();

  return app;
};

export default createApp;

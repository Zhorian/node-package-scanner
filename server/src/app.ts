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

    // This is to create a copy of the query parameter with a lowercase key
    // unless it's already been provided.
    this.app.use((req, res, next) => {
      const { query } = req;

      if (!query) {
        next();
        return;
      }

      Object.keys(query).forEach((key) => {
        const loweredKey = key.toLowerCase();
        if (query[loweredKey] !== undefined) {
          return;
        }

        query[loweredKey] = query[key];
        delete query[key];
      });

      next();
    });

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

import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@types';
import { IPingRouter, IRootRouter } from '@routing';
import { ISwaggerService } from './swagger.service';

export interface IRouteService {
  setupRoutes: (app: Express) => void;
}

@injectable()
export class RouteService implements IRouteService {
  private readonly pingRouter: IPingRouter;

  private readonly rootRouter: IRootRouter;

  private readonly swaggerService: ISwaggerService;

  constructor(
    @inject(TYPES.PingRouter) pingRouter: IPingRouter,
    @inject(TYPES.RootRouter) rootRouter: IRootRouter,
    @inject(TYPES.SwaggerService) swaggerService: ISwaggerService,
  ) {
    this.pingRouter = pingRouter;
    this.rootRouter = rootRouter;
    this.swaggerService = swaggerService;
  }

  setupRoutes = (app: Express) => {
    app.use('/docs', this.swaggerService.serve, this.swaggerService.setup());
    app.use('/api', this.rootRouter.router);
    app.use('/api/ping', this.pingRouter.router);
  };
}

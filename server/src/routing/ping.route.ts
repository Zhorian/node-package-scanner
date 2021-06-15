import { Router } from 'express';
import { IPingController } from '@controllers';
import { inject, injectable } from 'inversify';
import { TYPES } from '@types';

export interface IPingRouter {
  readonly router: Router;
}

@injectable()
export class PingRouter {
  private readonly controller: IPingController;

  readonly router: Router;

  constructor(@inject(TYPES.PingController) controller: IPingController) {
    this.controller = controller;
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter = () => {
    this.router.get('/', this.controller.index);
  };
}

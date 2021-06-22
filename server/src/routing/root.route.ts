import { Router } from 'express';
import { IRootController } from '@controllers';
import { inject, injectable } from 'inversify';
import { TYPES } from '@types';

export interface IRootRouter {
  readonly router: Router;
}

@injectable()
export class RootRouter {
  private readonly controller: IRootController;

  readonly router: Router;

  constructor(@inject(TYPES.RootController) controller: IRootController) {
    this.controller = controller;
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter = () => {
    /**
     * @swagger
     * /:
     *  get:
     *    description: Gets the url back using the key.
     *    tags: []
     *    responses:
     *      200:
     *        description: Success
     *        schema:
     *          $ref: "#/definitions/Dependency"
     *      400:
     *        description: Error
     *        schema:
     *          type: object
     *          properties:
     *            message:
     *              type: string
     */
    this.router.get('/', this.controller.index);
  };
}

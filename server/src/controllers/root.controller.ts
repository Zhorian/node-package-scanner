import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@types';
import { IDependencyService } from '@services';

export interface IRootController {
  index: (req: Request, res: Response) => Promise<void>;
}

interface IGetQuery {
  packageName?: string;
  versionOrTag?: string;
}

@injectable()
export class RootController implements IRootController {
  private readonly dependencyService: IDependencyService;

  constructor(@inject(TYPES.DependencyService) dependencyService: IDependencyService) {
    this.dependencyService = dependencyService;
  }

  index = async (req: Request, res: Response) => {
    const { packageName, versionOrTag }: IGetQuery = req.query;
    if ((packageName ?? '') === '') {
      res
        .status(400)
        .send({ message: 'packageName not provided' });
      return;
    }

    if ((versionOrTag ?? '') === '') {
      res
        .status(400)
        .send({ message: 'versionOrTag not provided' });
      return;
    }

    const dependencies = await this.dependencyService.getDependencies(packageName as string, versionOrTag as string);

    res.send(dependencies);
  };
}

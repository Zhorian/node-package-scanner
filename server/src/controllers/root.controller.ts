import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '@types';
import { IDependencyService } from '@services';

export interface IRootController {
  index: (req: Request, res: Response) => Promise<void>;
}

interface IGetQuery {
  packagename?: string;
  versionortag?: string;
}

@injectable()
export class RootController implements IRootController {
  private readonly dependencyService: IDependencyService;

  constructor(@inject(TYPES.DependencyService) dependencyService: IDependencyService) {
    this.dependencyService = dependencyService;
  }

  index = async (req: Request, res: Response) => {
    const { packagename, versionortag }: IGetQuery = req.query;
    if ((packagename ?? '') === '') {
      res
        .status(400)
        .send({ message: 'packageName not provided' });
      return;
    }

    if ((versionortag ?? '') === '') {
      res
        .status(400)
        .send({ message: 'versionOrTag not provided' });
      return;
    }

    const dependencies = await this.dependencyService.getDependencies(packagename as string, versionortag as string);

    res.send(dependencies);
  };
}

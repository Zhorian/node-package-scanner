import { Request, Response } from 'express';
import { injectable } from 'inversify';

export interface IRootController {
  index: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class RootController implements IRootController {

  index = async (req: Request, res: Response) => {
    res.send({ message: 'Hello World' });
  };
}

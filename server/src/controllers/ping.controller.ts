import { Request, Response } from 'express';
import { injectable } from 'inversify';

export interface IPingController {
  index: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class PingController implements IPingController {
  index = async (req: Request, res: Response) => {
    res.send({ message: 'PONG' });
  };
}

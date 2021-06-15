import TYPES from '@types';
import { inject, injectable } from 'inversify';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { IConfigService } from '@services';
import { RequestHandler } from 'express';

export interface ISwaggerService {
  readonly serve: RequestHandler[];
  setup: () => RequestHandler;
}

@injectable()
export class SwaggerService implements ISwaggerService {
  private readonly configService: IConfigService;

  readonly docs: object;

  readonly serve: RequestHandler[];

  private readonly uiOptions: swaggerUi.SwaggerUiOptions;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService) {
    this.configService = configService;
    const options = this.jsDocOptions();
    this.docs = swaggerJSDoc(options);
    this.serve = swaggerUi.serve;

    const swaggerCss = fs.readFileSync(path.join(__dirname, '../assets/css/swagger-custom.css')).toString();

    this.uiOptions = {
      customCss: swaggerCss,
    };
  }

  setup = () => swaggerUi.setup(this.docs, this.uiOptions);

  private jsDocOptions = (): swaggerJSDoc.Options => ({
    swaggerDefinition: {
      info: {
        title: 'Node Package Scanner',
        version: '1.0.0',
      },
      host: this.configService.serverHost,
      basePath: '/api',
    },
    apis: ['src/**/*.ts'],
  });
}

export default SwaggerService;

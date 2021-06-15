import { IApp } from '@app';
import DIContainer from '@di';
import { IConfigService } from '@services';
import TYPES from '@types';
import request from 'supertest';
import { MockedConfigService } from './mocks';

DIContainer.unbind(TYPES.ConfigService);
DIContainer.bind<IConfigService>(TYPES.ConfigService).to(MockedConfigService).inSingletonScope();

const appBooter = DIContainer.get<IApp>(TYPES.App);

export default request(appBooter.app);

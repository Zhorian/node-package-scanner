import 'module-alias/register';
import 'reflect-metadata';

import { IApp } from '@app';

import DIContainer from '@di';
import { TYPES } from './types';

const app = DIContainer.get<IApp>(TYPES.App);

app.listen();

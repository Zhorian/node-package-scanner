import { IConfigService } from '@services';
import { injectable } from 'inversify';
import StorageHelper from '../../helpers/storage.helper';

// Mocking the config for all tests
@injectable()
export class MockedConfigService implements IConfigService {
  readonly nodeEnvironment = 'test';

  readonly port = 8081;

  readonly rootGreeting = 'Greetings from mock config!'

  readonly serverHost = 'https://nps.com'

  readonly storagePath;

  constructor() {
    const storageHelper = new StorageHelper();
    this.storagePath = storageHelper.DIRECTORY;
  }
}

export default MockedConfigService;

import { IDependency } from '@models';
import { DependencyService, IDependencyService } from '@services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockedAxios = new MockAdapter(axios);

describe('DependencyService', () => {
  let subject: IDependencyService;
  beforeAll(async () => {
    jest.clearAllMocks();
  });

  describe('getDependencies', () => {
    const packageName = 'swagger-jsdoc';
    const versionOrTag = '6.1.0';

    beforeEach(async () => {
      const axiosRes = {
        dependencies: {
          'dependency-a': '1.1.1',
          'dependency-d': '0.6.7',
          'dependency-e': '0.9.7',
        },
      };

      const depARes = {
        dependencies: {
          'dependency-b': '1.2.3',
        },
      };

      const depBRes = {
        dependencies: {
          'dependency-c': '0.0.1',
        },
      };

      const depERes = {
        dependencies: {
          'dependency-f': '0.2.1',
          'dependency-g': '1.2.5',
        },
      };

      mockedAxios
        .onGet(`https://registry.npmjs.org/${packageName}/${versionOrTag}`)
        .reply(200, axiosRes);

      mockedAxios
        .onGet('https://registry.npmjs.org/dependency-a/1.1.1')
        .reply(200, depARes);

      mockedAxios
        .onGet('https://registry.npmjs.org/dependency-b/1.2.3')
        .reply(200, depBRes);

      mockedAxios
        .onGet('https://registry.npmjs.org/dependency-e/0.9.7')
        .reply(200, depERes);

      subject = new DependencyService();
    });

    it('returns an array', async () => {
      const actual = await subject.getDependencies(packageName, versionOrTag);
      const expected: IDependency[] = [
        {
          name: 'dependency-a',
          version: '1.1.1',
          dependencies: [
            {
              name: 'dependency-b',
              version: '1.2.3',
              dependencies: [
                {
                  name: 'dependency-c',
                  version: '0.0.1',
                  dependencies: [],
                },
              ],
            },
          ],
        },
        {
          name: 'dependency-d',
          version: '0.6.7',
          dependencies: [],
        },
        {
          name: 'dependency-e',
          version: '0.9.7',
          dependencies: [
            {
              name: 'dependency-f',
              version: '0.2.1',
              dependencies: [],
            },
            {
              name: 'dependency-g',
              version: '1.2.5',
              dependencies: [],
            },
          ],
        },
      ];

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('sanitizePackageName', () => {
    beforeEach(async () => {
      subject = new DependencyService();
    });

    describe('with "1.2.3"', () => {
      it('returns "1.2.3"', () => {
        const actual = subject.sanitizePackageName('1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with ">1.2.3"', () => {
      it('returns ">1.2.3"', () => {
        const actual = subject.sanitizePackageName('>1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with ">=1.2.3"', () => {
      it('returns ">=1.2.3"', () => {
        const actual = subject.sanitizePackageName('>=1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with "<1.2.3"', () => {
      it('returns "<1.2.3"', () => {
        const actual = subject.sanitizePackageName('<1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with "<=1.2.3"', () => {
      it('returns "<=1.2.3"', () => {
        const actual = subject.sanitizePackageName('<=1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with "~1.2.3"', () => {
      it('returns "~1.2.3"', () => {
        const actual = subject.sanitizePackageName('~1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with "^1.2.3"', () => {
      it('returns "^1.2.3"', () => {
        const actual = subject.sanitizePackageName('^1.2.3');
        expect(actual).toBe('1.2.3');
      });
    });

    describe('with "*"', () => {
      it('returns "*"', () => {
        const actual = subject.sanitizePackageName('*');
        expect(actual).toBe('latest');
      });
    });
  });
});

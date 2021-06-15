import { Response } from 'supertest';
import testRequest from '../test-request';

describe('/api', () => {
  let subject: Response;
  const baseUrl: string = '/api';

  describe('without packageName in query string', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      subject = await testRequest.get(baseUrl);
    });

    it('returns 400', () => {
      expect(subject.status).toBe(400);
    });

    it('returns an object with a message stating "packageName not provided', () => {
      expect(subject.body).toStrictEqual({
        message: 'packageName not provided',
      });
    });
  });

  describe('without versionOrTag in query string', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      const url = `${baseUrl}?packageName=my-package`;
      subject = await testRequest.get(url);
    });

    it('returns 400', () => {
      expect(subject.status).toBe(400);
    });

    it('returns an object with a message stating "versionOrTag not provided', () => {
      expect(subject.body).toStrictEqual({
        message: 'versionOrTag not provided',
      });
    });
  });

  describe('with versionOrTag in query string', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      const url = `${baseUrl}?packageName=react&versionOrTag=latest`;
      subject = await testRequest.get(url);
    });

    it('returns 200', () => {
      expect(subject.status).toBe(200);
    });

    it('returns an object with a message stating "versionOrTag not provided', () => {
      expect(subject.body).toStrictEqual([
        { name: 'loose-envify', version: '^1.1.0', dependencies: [] },
        { name: 'object-assign', version: '^4.1.1', dependencies: [] },
      ]);
    });
  });
});

import { IDependency } from '@models';
import axios from 'axios';
import { injectable } from 'inversify';

export interface IDependencyService {
  getDependencies: (packageName: string, versionOrTag: string) => Promise<IDependency[]>
  sanitizePackageName: (packageName: string) => string;
}

@injectable()
export class DependencyService implements IDependencyService {
  getDependencies = async (packageName: string, versionOrTag: string) => {
    const registryUrl = this.buildRegistryUrl(packageName, versionOrTag);
    const npmRes = await axios.get(registryUrl).catch(() => ({
      data: {},
    }));

    if (!npmRes?.data?.dependencies) {
      return [];
    }

    const rawDependencies = npmRes.data.dependencies;

    const result: Promise<IDependency>[] = Object.getOwnPropertyNames(rawDependencies).map(async (propName) => ({
      name: propName,
      version: rawDependencies[propName],
      dependencies: await this.getDependencies(propName, rawDependencies[propName]),
    }));

    return Promise.all(result);
  }

  sanitizePackageName = (packageName: string) => {
    const quickFind = packageName.match(/(?:\d.\d.\d)/g);

    if (!quickFind) {
      return 'latest';
    }

    return quickFind[0];
  }

  // eslint-disable-next-line max-len
  private buildRegistryUrl = (packageName: string, versionOrTag: string) => `https://registry.npmjs.org/${packageName}/${versionOrTag}`
}

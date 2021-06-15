export interface IDependency {
  name: string;
  version: string;
  dependencies: IDependency[];
}

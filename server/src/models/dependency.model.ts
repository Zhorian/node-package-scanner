/**
 * @swagger
 * definitions:
 *  Dependency:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      version:
 *        type: string
 *      dependencies:
 *        type: array
 *        items:
 *          $ref: "#/definitions/Dependency"
 */

export interface IDependency {
  name: string;
  version: string;
  dependencies: IDependency[];
}

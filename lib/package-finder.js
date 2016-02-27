'use strict';

const JsonPackageFinder = require('json-package-finder');

class NpmPackageFinder extends JsonPackageFinder {
  constructor (packageJson) {
    super({
      json: packageJson,
      dependencyPaths: ['dependencies', 'devDependencies']
    });
  }
  static make (packageJson) {
    return new NpmPackageFinder(packageJson);
  }
  find (query) {
    super.find(query).map(this._transform.bind(this));
  }
  _transform (result) {
    return {
      plugin: 'npm',
      src: 'packageJson',
      packageName: result.key,
      version: result.value,
      dependencyGroup: result.path
    };
  }
}

module.exports = NpmPackageFinder;

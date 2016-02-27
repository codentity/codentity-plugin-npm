'use strict';

const CodentityPlugin = require('codentity-plugin');
const NpmPackageFinder = require('./package-finder');
const minimatch = require('minimatch');

class NpmPlugin extends CodentityPlugin {
  constructor (config) {
    super('npm');
    this._packageJson = config.packageJson;
  }
  static make (config) {
    return new NpmPlugin(config);
  }
  find (query) {
    return NpmPackageFinder.make(this._packageJson).find(query);
  }
  filter (filePaths) {
    return filePaths.filter((filePath) => {
      return minimatch(filePath, 'node_modules/**');
    });
  }
}

NpmPlugin.requirements = {
  packageJson: 'package.json'
};

module.exports = NpmPlugin;

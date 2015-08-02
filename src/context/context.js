/**
 * Created by Sascha on 24.07.15.
 */
var path = require('path');

var readConfig = require('./read-config');
var readIndex = require('./read-index');

var Context = function(dir) {

    // Setup paths
    this.bookDir = dir;

    this.indexPath = path.join(this.bookDir, 'index.txt');
    this.configPath = path.join(this.bookDir, 'config.json');

    this.outDir = path.join(this.bookDir, 'out');
    this.outLibDir = path.join(this.outDir, 'lib');
    this.outStyleDir = path.join(this.outDir, 'styles');
    this.outScriptDir = path.join(this.outDir, 'scripts');
    this.outRawDir = path.join(this.outDir, 'raw');
    this.outRenderedDir = path.join(this.outDir, 'rendered');

    // Load index, config
    this.index = readIndex(this.indexPath);
    this.config = readConfig(this.configPath);
};

module.exports = Context;
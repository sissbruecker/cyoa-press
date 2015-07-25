/**
 * Created by Sascha on 24.07.15.
 */
var path = require('path');

var config = {};

config.setBookDir = function(dir) {
    config.bookDir = dir;
    config.indexPath = path.join(config.bookDir, 'index.txt');
    config.outDir = path.join(config.bookDir, 'out');
    config.outStyleDir = path.join(config.outDir, 'styles');
    config.outScriptDir = path.join(config.outDir, 'scripts');
    config.outRawDir = path.join(config.outDir, 'raw');
    config.outRenderedDir = path.join(config.outDir, 'rendered');
};

module.exports = config;
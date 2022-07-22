/**
 * Created by Sascha on 01.08.15.
 */
var path = require('path');
var fs = require('fs');
var extend = require('extend');

var DEFAULT_CONFIG = {
    reload: false, // true = delete scraped content, false = only scrape new content
    transforms: []
};

module.exports = function readConfig(path) {

    var config = extend(true, {}, DEFAULT_CONFIG);

    if (fs.existsSync(path)) {
        var fileConfig = JSON.parse(fs.readFileSync(path).toString());
        config = extend(true, config, fileConfig);
    }

    return config;
};
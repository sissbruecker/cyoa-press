/**
 * Created by Sascha on 05.07.15.
 */

var getUrl = require('./loaders/get-url');
var getFile = require('./loaders/get-file');

var partFileChecker = require('./util/part-file-checker');
var partFileWriter = require('./util/part-file-writer');

module.exports = function scrape(context, callback) {

    var checker = partFileChecker(context.outRawDir);
    var writer = partFileWriter(context.outRawDir);

    var index = context.index;
    var reloadSetting = context.config.reload;

    var current = -1;

    console.log('Scraping ' + index.length + ' parts...');

    nextPart();

    function nextPart() {

        current++;

        if (current >= index.length) {
            console.log('Finished scraping');
            callback.call();
            return;
        }

        var part = index[current];

        var shouldLoad = !checker(part) || reloadSetting;

        if (!shouldLoad) {
            nextPart();
            return;
        }

        switch (part.src) {

            case 'url':
                console.log('Scraping part ' + part.id + ' from URL (' + part.url + ')');
                getUrl(context, part, function (content) {
                    writer(part, content);
                    nextPart();
                });
                break;

            case 'file':
                console.log('Scraping part ' + part.id + ' from file (' + part.path + ')');
                getFile(context, part, function (content) {
                    writer(part, content);
                    nextPart();
                });
                break;

            default:
                nextPart();
        }
    }
};
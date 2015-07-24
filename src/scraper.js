/**
 * Created by Sascha on 05.07.15.
 */

var getPost = require('./get-post');
var getFile = require('./get-file');

module.exports = function scrape(index, writer, callback) {

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

        switch (part.src) {

            case 'url':
                console.log('Scraping part ' + part.id + ' from URL (' + part.url + ')');
                getPost(part, function (content) {
                    writer(part, content);
                    nextPart();
                });
                break;

            case 'file':
                console.log('Scraping part ' + part.id + ' from file (' + part.path + ')');
                getFile(part, function (content) {
                    writer(part, content);
                    nextPart();
                });
                break;

            default:
                console.log('Skipping non-content part ' + part.id);
                nextPart();
        }
    }
};
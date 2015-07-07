/**
 * Created by Sascha on 05.07.15.
 */

var getPost = require('./get-post');

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

        if (part.type != 'chapter' || !part.url) {
            console.log('Skipping non-content part ' + part.id);
            nextPart();
        } else {
            console.log('Scraping part ' + part.id + ' (' + part.url + ')');
            getPost(part, function (content) {
                writer(part, content);
                nextPart();
            });
        }
    }
};
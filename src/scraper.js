/**
 * Created by Sascha on 05.07.15.
 */

var getPost = require('./get-post');

module.exports = function scrape(index, writer, callback) {

    var current = -1;

    console.log('Scraping ' + index.length + ' chapters...');

    nextChapter();

    function nextChapter() {

        current++;

        if (current >= index.length) {
            console.log('Finished scraping');
            callback.call();
            return;
        }

        var chapter = index[current];

        if (chapter.type != 'content') {
            console.log('Skipping non-content chapter ' + chapter.index);
            nextChapter();
        } else {
            console.log('Scraping chapter ' + chapter.index + ' (' + chapter.url + ')');
            getPost(chapter, function (content) {
                writer.call(null, chapter, content);
                nextChapter();
            });
        }
    }
};
/**
 * Created by Sascha on 05.07.15.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = function getPost(chapter, callback) {

    var postId = chapter.url.split('#')[1];
    var postSelector = generatePostSelector(postId);

    request(chapter.url, function(err, resonse, body) {

        var $ = cheerio.load(body);
        var postContent = $(postSelector).html();

        callback.call(null, postContent);
    });
};

function generatePostSelector(postId) {
    return 'li#' + postId + ' div.messageContent > article > blockquote';
}
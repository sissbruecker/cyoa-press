/**
 * Created by Sascha on 05.07.15.
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = function getPost(context, part, callback) {

    var postId = getPostId(part.url);
    var postSelector = generatePostSelector(postId);

    request(part.url, function (err, resonse, body) {

        var $ = cheerio.load(body);
        var postContent = $(postSelector).html();

        callback.call(null, postContent);
    });
};

function generatePostSelector(postId) {
    return 'article#js-' + postId + ' article.message-body .bbWrapper';
}

var HASHED_POST_ID_PATTERN = /.*\/page-[0-9]*#post-[0-9]*/;
var URL_POST_ID_PATTERN = /.*posts\/[0-9]*/;
var NEW_URL_POST_ID_PATTERN = /.*post-[0-9]+$/;

function getPostId(url) {

    if (url.match(HASHED_POST_ID_PATTERN)) return getHashedPostId(url);
    if (url.match(URL_POST_ID_PATTERN)) return getUrlPostId(url);
    if (url.match(NEW_URL_POST_ID_PATTERN)) return getNewUrlPostId(url);

    return null;
}

function getHashedPostId(url) {
    return url.split('#')[1];
}

function getUrlPostId(url) {

    var parts = url.split('/');
    var id = parts[parts.length - 1];

    return 'post-' + id;
}

function getNewUrlPostId(url) {

    var parts = url.split('/');
    return parts[parts.length - 1];
}
/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');

module.exports = function readIndex(path) {

    var lines = fs.readFileSync(path).toString().split('\n');

    return lines
        .map(toPart)
        .filter(notNull);
};

function toPart(line, index) {

    if (!line || line.length == 0) return;

    var parts = line.split('|');
    var type = extractPart(parts, 0);

    switch (type) {
        case 'chapter':
            return asChapter(index, type, parts);
        default :
            return asGeneric(index, type, parts);
    }
}

function asChapter(index, type, parts) {

    var url = extractPart(parts, 3);

    if (url) url = decodeURI(url);

    return {
        id: index + 1,
        type: type,
        heading: extractPart(parts, 1),
        name: extractPart(parts, 2),
        url: url,
        indexable: true
    }
}

function asGeneric(index, type, parts) {
    return {
        id: index + 1,
        type: type,
        name: extractPart(parts, 1),
        indexable: false
    }
}

function extractPart(parts, index) {

    if (index > parts.length - 1) return null;

    var part = parts[index];

    return part.trim();
}

function notNull(item) {
    return item != null;
}
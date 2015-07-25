/**
 * Created by Sascha on 05.07.15.
 */
var path = require('path');
var fs = require('fs-extra');

var config = require('./config');
var bookDir = getArg('book');

console.log('Processing book in dir: ' + bookDir);
config.setBookDir(bookDir);

var index;

var program = [
        clear,
        prepare,
        copy,
        readIndex,
        scrape,
        render,
        bind
    ],
    current = -1;

next();

function clear() {

    fs.removeSync(config.outDir);

    next();
}

function prepare() {

    fs.ensureDirSync(config.outDir);
    fs.ensureDirSync(config.outStyleDir);
    fs.ensureDirSync(config.outScriptDir);
    fs.ensureDirSync(config.outRawDir);
    fs.ensureDirSync(config.outRenderedDir);

    next();
}

function copy() {

    fs.copySync('styles', config.outStyleDir);
    fs.copySync('scripts', config.outScriptDir);

    next();
}

function readIndex() {

    var indexer = require('./indexer');

    console.log('Reading index: ' + config.indexPath);

    index = indexer(config.indexPath);

    console.log('Found ' + index.length + ' parts');
    next();
}

function scrape() {

    var scraper = require('./scraper');
    var writer = require('./part-writer')(fileNameById, config.outRawDir);

    scraper(index, writer, next);
}

function render() {

    var renderer = require('./renderer');
    var reader = require('./part-reader')(fileNameById, config.outRawDir);
    var writer = require('./part-writer')(fileNameById, config.outRenderedDir);

    renderer(index, reader, writer);
    next();
}

function bind() {

    var binder = require('./binder');
    var reader = require('./part-reader')(fileNameById, config.outRenderedDir);

    binder(index, reader);
    next();
}

function next() {

    current++;

    if (current >= program.length) {
        return;
    }

    var step = program[current];
    step.call();
}

function fileNameById(part) {
    return part.id + '.html';
}

function getArg(argName) {

    var argValue;

    process.argv.forEach(function (val) {

        var parts = val.split('=');

        if (!parts.length > 1) return;
        if (!parts[0] == argName) return;

        argValue = parts[1];
    });

    return argValue;
}
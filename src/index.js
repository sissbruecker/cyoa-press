/**
 * Created by Sascha on 05.07.15.
 */

var INDEX_PATH = '../books/legend/index.txt';
var OUTPUT_PATH = '../books/legend/out';

var path = require('path');
var fs = require('fs-extra');
var util = require('./util');

var index,
    outDir,
    outStyleDir,
    outChapterRawDir,
    outChapterTransformedDir;

var program = [
        prepareOutput,
        readIndex,
        scrape,
        transform,
        bind
    ],
    current = -1;

next();

function prepareOutput() {
    outDir = OUTPUT_PATH;
    outStyleDir = path.join(outDir, 'styles');
    outChapterRawDir = path.join(outDir, 'raw');
    outChapterTransformedDir = path.join(outDir, 'transformed');

    fs.removeSync(outDir);
    fs.ensureDirSync(outDir);
    fs.ensureDirSync(outStyleDir);
    fs.ensureDirSync(outChapterRawDir);
    fs.ensureDirSync(outChapterTransformedDir);

    fs.copySync('styles', outStyleDir);

    next();
}

function readIndex() {

    console.log('Reading index: ' + INDEX_PATH);

    var indexer = require('./indexer');
    index = indexer(INDEX_PATH);

    console.log('Found ' + index.length + ' chapters');
    next();
}

function scrape() {

    var scraper = require('./scraper');
    var writer = require('./chapter-writer')(util.fileNameByIndex, outChapterRawDir);

    scraper(index, writer, next);
}

function transform() {

    var transformer = require('./transformer');
    var reader = require('./chapter-reader')(util.fileNameByIndex, outChapterRawDir);
    var writer = require('./chapter-writer')(util.fileNameByIndex, outChapterTransformedDir);

    transformer(index, reader, writer);
    next();
}

function bind() {

    var binder = require('./binder');
    var reader = require('./chapter-reader')(util.fileNameByIndex, outChapterTransformedDir);

    binder(index, reader, outDir);
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
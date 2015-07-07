/**
 * Created by Sascha on 05.07.15.
 */

var INDEX_PATH = '../books/legend/index.txt';
var OUTPUT_PATH = '../books/legend/out';

var path = require('path');
var fs = require('fs-extra');

var index,
    outDir,
    outStyleDir,
    outChapterRawDir,
    outChapterRenderedDir;

var program = [
        prepareOutput,
        readIndex,
        scrape,
        render,
        bind
    ],
    current = -1;

next();

function prepareOutput() {
    outDir = OUTPUT_PATH;
    outStyleDir = path.join(outDir, 'styles');
    outChapterRawDir = path.join(outDir, 'raw');
    outChapterRenderedDir = path.join(outDir, 'rendered');

    fs.removeSync(outDir);
    fs.ensureDirSync(outDir);
    fs.ensureDirSync(outStyleDir);
    fs.ensureDirSync(outChapterRawDir);
    fs.ensureDirSync(outChapterRenderedDir);

    fs.copySync('styles', outStyleDir);

    next();
}

function readIndex() {

    var indexer = require('./indexer');

    console.log('Reading index: ' + INDEX_PATH);

    index = indexer(INDEX_PATH);

    console.log('Found ' + index.length + ' parts');
    next();
}

function scrape() {

    var scraper = require('./scraper');
    var writer = require('./part-writer')(fileNameById, outChapterRawDir);

    scraper(index, writer, next);
}

function render() {

    var renderer = require('./renderer');
    var reader = require('./part-reader')(fileNameById, outChapterRawDir);
    var writer = require('./part-writer')(fileNameById, outChapterRenderedDir);

    renderer(index, reader, writer);
    next();
}

function bind() {

    var binder = require('./binder');
    var reader = require('./part-reader')(fileNameById, outChapterRenderedDir);

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

function fileNameById(part) {
    return part.id + '.html';
}
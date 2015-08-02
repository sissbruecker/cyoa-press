/**
 * Created by Sascha on 05.07.15.
 */
var path = require('path');
var fs = require('fs-extra');

var scrape = require('./scrape');
var render = require('./render');
var bind = require('./bind');

var Context = require('./context/context');
var getArg = require('./util/get-arg');

var bookDir = getArg('book');

console.log('Processing book in dir: ' + bookDir);

var context = new Context(bookDir);

console.log('Reload setting: ' + context.config.reload);

var program = [
        clear,
        prepare,
        copy,
        scrape,
        render,
        bind
    ],
    current = -1;

next();

function clear() {

    if(context.config.reload) {
        fs.removeSync(context.outDir);
    }

    next();
}

function prepare() {

    fs.ensureDirSync(context.outDir);
    fs.ensureDirSync(context.outLibDir);
    fs.ensureDirSync(context.outStyleDir);
    fs.ensureDirSync(context.outScriptDir);
    fs.ensureDirSync(context.outRawDir);
    fs.ensureDirSync(context.outRenderedDir);

    next();
}

function copy() {

    fs.copySync('../resources/lib', context.outLibDir);
    fs.copySync('../resources/styles', context.outStyleDir);
    fs.copySync('../resources/scripts', context.outScriptDir);

    next();
}

function next() {

    current++;

    if (current >= program.length) {
        return;
    }

    var step = program[current];
    step.call(null, context, next);
}
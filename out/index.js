"use strict";
var grammarLib = require('./grammar');
var volkswagenLib = require('./volkswagen');
var dataLib = require('./data');
var timeLib = require('./time');
var randomLib = require('./random');
function helpOverall() {
    console.log("Available functions are:\n\t- data\n\t- grammar\n\t- random\n\t- time\n\t- volkswagen\n  \nUse German.{module}.help().bitte() for more info about the module");
}
function helpModule(obj) {
    return function () {
        console.log('Available functions are:');
        Object.keys(obj).forEach(function (funName) {
            console.log("\t- " + funName);
        });
        console.log('Don\'t forget to be polite bitte()!');
    };
}
function wrapFunctions(obj) {
    obj.help = helpModule(obj);
    Object.keys(obj).forEach(function (funName) {
        var fun = obj[funName];
        obj[funName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return {
                bitte: function () {
                    return fun.apply(void 0, args);
                }
            };
        };
    });
    return obj;
}
exports.data = wrapFunctions(dataLib);
exports.grammar = wrapFunctions(grammarLib);
exports.time = wrapFunctions(timeLib);
exports.random = wrapFunctions(randomLib);
exports.volkswagen = volkswagenLib;
function eu() {
    [exports.data, exports.time, exports.grammar].forEach(function (lib) {
        console.log(lib);
        lib.extendNatives().bitte();
    });
}
exports.eu = eu;
function help() {
    return {
        bitte: function () {
            helpOverall();
        }
    };
}
exports.help = help;

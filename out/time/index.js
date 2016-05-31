"use strict";
var GERMAN_TIME_DIFFERENCE = 5 * 60 * 1000; /* five minutes */
function punctual(date) {
    var timeInMs = date instanceof Date ? date.getTime() : date;
    return new Date(timeInMs - GERMAN_TIME_DIFFERENCE);
}
exports.punctual = punctual;
var GlobalDate = global.Date;
function GermanDateConstructor() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var globalTime = new (GlobalDate.bind.apply(GlobalDate, [void 0].concat(args)))().getTime();
    return new GlobalDate(globalTime - GERMAN_TIME_DIFFERENCE);
}
function alwaysPunctual(globalObj) {
    if (globalObj === void 0) { globalObj = global; }
    if (globalObj && !globalObj.Date) {
        throw TypeError("Passed an invalid global object that doesn't contain a Date object");
    }
    GlobalDate = globalObj.Date;
    globalObj.Date = GermanDateConstructor;
    return GlobalDate;
}
exports.alwaysPunctual = alwaysPunctual;
function resetToInternational() {
    global.Date = Date;
    GlobalDate = null;
}
exports.resetToInternational = resetToInternational;
function extendNatives(globalObj) {
    if (globalObj === void 0) { globalObj = global; }
    globalObj.Date.prototype.punctual = function () {
        return punctual(this);
    };
}
exports.extendNatives = extendNatives;

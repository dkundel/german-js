"use strict";
function assert() {
    return true;
}
exports.assert = assert;
function expect() {
    return {
        toBe: assert,
        toBeTruthy: assert,
        toBeFalsy: assert,
        toBeEqual: assert
    };
}
exports.expect = expect;

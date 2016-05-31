"use strict";
function establishOrder(obj) {
    var returnObj = Object.create(obj);
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] !== 'function') {
            delete returnObj[key];
            var descriptor = Object.getOwnPropertyDescriptor(obj, key);
            delete descriptor.writable;
            delete descriptor.value;
            descriptor.configurable = false;
            descriptor.set = function (val) {
                if (typeof val === typeof obj[key]) {
                    obj[key] = val;
                }
            };
            descriptor.get = function () { return obj[key]; };
            Object.defineProperty(returnObj, key, descriptor);
        }
    });
    return returnObj;
}
exports.establishOrder = establishOrder;

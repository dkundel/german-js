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
    Object.freeze(returnObj);
    return returnObj;
}
exports.establishOrder = establishOrder;
function getPrivacy(obj, spy, hide) {
    if (hide === void 0) { hide = false; }
    if (!spy || typeof spy.log !== 'function') {
        spy = {
            log: function () { return undefined; }
        };
    }
    var attributes = Object.keys(obj);
    if (Array.isArray(obj)) {
        attributes = obj;
    }
    var safeObj = {};
    attributes.forEach(function (attr) {
        Object.defineProperty(safeObj, attr, {
            enumerable: !hide,
            configurable: false,
            set: function (val) {
                spy.log(val);
            },
            get: function () { return null; }
        });
    });
    Object.freeze(safeObj);
    return safeObj;
}
exports.getPrivacy = getPrivacy;
function extendNatives(globalObj) {
    if (globalObj === void 0) { globalObj = global; }
    globalObj.Object.prototype.establishOrder = function () {
        return establishOrder(this);
    };
    globalObj.Object.prototype.privacy = function (spy, hide) {
        return getPrivacy(this, spy);
    };
}
exports.extendNatives = extendNatives;

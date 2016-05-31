"use strict";
var POPULAR_BEERS = [
    'Beck’s',
    'Krombacher',
    'Warsteiner',
    'Veltins',
    'Bitburger',
    'König Pilsener',
    'Oettinger',
    'Erdinger',
    'Paulaner',
    'Radeberger',
    'Hasseröder',
    'Jever',
    'Schöfferhofer',
    'Köstritzer',
    'Clausthaler',
    'Franziskaner'
];
function beer() {
    var idx = Math.floor(Math.random() * POPULAR_BEERS.length);
    return POPULAR_BEERS[idx];
}
exports.beer = beer;

"use strict";
function getRandomArticle() {
    var index = Math.floor(Math.random() * 3);
    return ['der', 'die', 'das'][index];
}
function derDieDas(input, forceInsertRandom) {
    if (forceInsertRandom === void 0) { forceInsertRandom = false; }
    var insertRandom = input.indexOf(' the ') === -1 || forceInsertRandom;
    var words = input.split(/\s/);
    var result = [];
    words.forEach(function (word) {
        if (word.toLowerCase() === 'the') {
            result.push(getRandomArticle());
        }
        else {
            if (insertRandom && /[A-Z]/.test(word) && Math.random() > 0.5) {
                result.push(getRandomArticle());
            }
            result.push(word);
        }
    });
    return result.join(' ');
}
exports.derDieDas = derDieDas;
function getWord(input) {
    return input[0].toUpperCase() + input.slice(1).replace(/(\s|\W)/gi, '');
}
exports.getWord = getWord;

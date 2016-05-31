function getRandomArticle() {
  let index = Math.floor(Math.random() * 3);
  return ['der', 'die', 'das'][index];
}

export function derDieDas(input: string, forceInsertRandom: boolean = false) {
  let insertRandom = input.indexOf(' the ') === -1 || forceInsertRandom;
  let words = input.split(/\s/);
  let result = [];
  words.forEach(word => {
    if (word.toLowerCase() === 'the') {
      result.push(getRandomArticle());
    } else {
      if (insertRandom && /[A-Z]/.test(word) && Math.random() > 0.5) {
        result.push(getRandomArticle());
      }
      
      result.push(word);
    }
  });
  
  return result.join(' ');
}

export function getWord(input: string) {
  input = input.trim();
  return input[0].toUpperCase() + input.slice(1).replace(/(\s|\W)/gi, '');
}

export function extendNatives(globalObj: any = global) {
  globalObj.String.prototype.germanWord = function() {
    return getWord(this);
  }
  
  globalObj.String.prototype.derDieDas = function() {
    return derDieDas(this);
  }
}
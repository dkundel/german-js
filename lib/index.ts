import * as grammarLib from './grammar';
import * as volkswagenLib from './volkswagen'; 
import * as dataLib from './data';
import * as timeLib from './time';
import * as randomLib from './random';

function helpOverall() {
  console.log(`Available functions are:
\t- data
\t- grammar
\t- random
\t- time
\t- volkswagen
  
Use German.{module}.help().bitte() for more info about the module`);
}

function helpModule(obj) {
  return () => {
    console.log('Available functions are:');
    Object.keys(obj).forEach(funName => {
      console.log(`\t- ${funName}`);
    });
    console.log('Don\'t forget to be polite bitte()!');
  }
}

function wrapFunctions(obj) {
  obj.help = helpModule(obj);
  Object.keys(obj).forEach(funName => {
    let fun = obj[funName];
    obj[funName] = (...args) => {
      return {
        bitte: () => {
          return fun(...args);
        }
      }
    }
  });
  
  return obj;
}

export let data = wrapFunctions(dataLib);
export let grammar = wrapFunctions(grammarLib);
export let time = wrapFunctions(timeLib);
export let random = wrapFunctions(randomLib);
export let volkswagen = volkswagenLib;

export function eu() {
  [data, time, grammar].forEach(lib => {
    console.log(lib);
    lib.extendNatives().bitte();
  });
}

export function help() {
  return {
    bitte: () => {
      helpOverall();
    }
  }
}
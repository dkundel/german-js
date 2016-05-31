const GERMAN_TIME_DIFFERENCE = 5 * 60 * 1000; /* five minutes */

export function punctual(date: Date | number): Date {
  let timeInMs = date instanceof Date ? date.getTime() : date;
  
  return new Date(timeInMs - GERMAN_TIME_DIFFERENCE);
}

let GlobalDate: any = global.Date;

function GermanDateConstructor(...args): DateConstructor {
  let globalTime = new GlobalDate(...args).getTime();
  
  return new GlobalDate(globalTime - GERMAN_TIME_DIFFERENCE);
}

export function alwaysPunctual(globalObj: any = global): DateConstructor {
  if (globalObj && !globalObj.Date) {
    throw TypeError(`Passed an invalid global object that doesn't contain a Date object`);
  }
  
  GlobalDate = globalObj.Date;
  globalObj.Date = GermanDateConstructor;
  
  return GlobalDate;
}

export function resetToInternational() {
  global.Date = Date;
  GlobalDate = null;
}

export function extendNatives(globalObj: any = global) {
  globalObj.Date.prototype.punctual = function() {
    return punctual(this);
  }
}
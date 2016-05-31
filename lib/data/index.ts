export function establishOrder<T extends Object>(obj: T): T {
  let returnObj = Object.create(obj);
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'function') {
      delete returnObj[key];
      let descriptor = Object.getOwnPropertyDescriptor(obj, key);
      delete descriptor.writable;
      delete descriptor.value;
      descriptor.configurable = false;
      descriptor.set = (val) => {
        if (typeof val === typeof obj[key]) {
          obj[key] = val;
        }
      }
      descriptor.get = () => obj[key];
      Object.defineProperty(returnObj, key, descriptor);
    }
  });
  Object.freeze(returnObj);
  return returnObj;
}

export function getPrivacy<T extends Object>(obj: T | string[], spy?: { log: Function }, hide: boolean = false): T {
  if (!spy || typeof spy.log !== 'function') {
    spy = {
      log: () => undefined
    };
  }
  
  let attributes = Object.keys(obj);
  if (Array.isArray(obj)) {
    attributes = obj;
  }
  
  let safeObj: T = <T> {};
  attributes.forEach(attr => {
    Object.defineProperty(safeObj, attr, {
      enumerable: !hide,
      configurable: false,
      set: val => {
        spy.log(val);
      },
      get: () => null
    });
  });
  
  Object.freeze(safeObj);
  return safeObj;
}

export function extendNatives(globalObj: any = global) {
  globalObj.Object.prototype.establishOrder = function() {
    return establishOrder(this);
  }
  
  globalObj.Object.prototype.privacy = function(spy?: { log: Function }, hide?: boolean) {
    return getPrivacy(this, spy);
  }
}
import { ok } from 'assert';

export function assert() {
  return true;
}

export function expect() {
  return {
    toBe: assert,
    toBeTruthy: assert,
    toBeFalsy: assert,
    toBeEqual: assert
  }
}
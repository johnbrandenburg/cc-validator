import {test, describe, expect} from 'vitest';
import { luhn } from '..';

describe('luhn validation', () => {
  test('valid strings should be valid', () => {
    expect(luhn('')).toBeTruthy()
    expect(luhn('3436614493')).toBeTruthy();
    expect(luhn('26039')).toBeTruthy();
    expect(luhn('79927398713')).toBeTruthy()
  });

  test('invalid strings should be invalid', () => {
    expect(luhn('12')).toBeFalsy()
    expect(luhn('3436614496')).toBeFalsy();
    expect(luhn('26037')).toBeFalsy();
    expect(luhn('ab')).toBeFalsy();
  });

});
// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let sum = simpleCalculator({ a: 17, b: 6, action: Action.Add });
    expect(sum).toBe(23);
    sum = simpleCalculator({ a: 5, b: -9, action: Action.Add });
    expect(sum).toBe(-4);
    sum = simpleCalculator({ a: 8, b: 93, action: Action.Add });
    expect(sum).toBe(101);
  });

  test('should subtract two numbers', () => {
    let quot = simpleCalculator({ a: 17, b: 6, action: Action.Subtract });
    expect(quot).toBe(11);
    quot = simpleCalculator({ a: 5, b: -9, action: Action.Subtract });
    expect(quot).toBe(14);
    quot = simpleCalculator({ a: 8, b: 93, action: Action.Subtract });
    expect(quot).toBe(-85);
  });

  test('should multiply two numbers', () => {
    let mult = simpleCalculator({ a: 17, b: 6, action: Action.Multiply });
    expect(mult).toBe(102);
    mult = simpleCalculator({ a: 5, b: -9, action: Action.Multiply });
    expect(mult).toBe(-45);
    mult = simpleCalculator({ a: 8, b: 93, action: Action.Multiply });
    expect(mult).toBe(744);
  });

  test('should divide two numbers', () => {
    let div = simpleCalculator({ a: 18, b: 6, action: Action.Divide });
    expect(div).toBe(3);
    div = simpleCalculator({ a: 5, b: -8, action: Action.Divide });
    expect(div).toBe(-0.625);
    div = simpleCalculator({ a: 8, b: 0, action: Action.Divide });
    expect(div).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    let exp = simpleCalculator({ a: 17, b: 6, action: Action.Exponentiate });
    expect(exp).toBe(24137569);
    exp = simpleCalculator({ a: 4, b: -2, action: Action.Exponentiate });
    expect(exp).toBe(0.0625);
    exp = simpleCalculator({ a: 8, b: 0, action: Action.Exponentiate });
    expect(exp).toBe(1);
  });

  test('should return null for invalid action', () => {
    let res = simpleCalculator({ a: 17, b: 6, action: 'Motor' });
    expect(res).toBeNull();
    res = simpleCalculator({ a: 5, b: -9, action: 'Fight' });
    expect(res).toBeNull();
    res = simpleCalculator({ a: 8, b: 93, action: 'Factorial' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let res = simpleCalculator({ a: 17, b: 'six', action: Action.Add });
    expect(res).toBeNull();
    res = simpleCalculator({ a: 5, b: '-9', action: Action.Exponentiate });
    expect(res).toBeNull();
    res = simpleCalculator({ a: 8, b: true, action: Action.Divide });
    expect(res).toBeNull();
  });
});

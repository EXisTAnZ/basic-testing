// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 17, b: 6, action: Action.Add, expected: 23 },
  { a: 5, b: -9, action: Action.Add, expected: -4 },
  { a: 8, b: 93, action: Action.Add, expected: 101 },
  { a: 17, b: 6, action: Action.Subtract, expected: 11 },
  { a: 5, b: -9, action: Action.Subtract, expected: 14 },
  { a: 8, b: 93, action: Action.Subtract, expected: -85 },
  { a: 17, b: 6, action: Action.Multiply, expected: 102 },
  { a: 5, b: -9, action: Action.Multiply, expected: -45 },
  { a: 8, b: 93, action: Action.Multiply, expected: 744 },
  { a: 18, b: 6, action: Action.Divide, expected: 3 },
  { a: 5, b: -8, action: Action.Divide, expected: -0.625 },
  { a: 8, b: 0, action: Action.Divide, expected: Infinity },
  { a: 17, b: 6, action: Action.Exponentiate, expected: 24137569 },
  { a: 4, b: -2, action: Action.Exponentiate, expected: 0.0625 },
  { a: 8, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 17, b: 6, action: 'Motor', expected: null },
  { a: 5, b: -9, action: 'Fight', expected: null },
  { a: 8, b: 93, action: 'Factorial', expected: null },
  { a: 17, b: 'six', action: Action.Add, expected: null },
  { a: 5, b: '-9', action: Action.Exponentiate, expected: null },
  { a: 8, b: true, action: Action.Divide, expected: null },
];

describe.each(testCases)(
  'simpleCalculator action: $action of $a and $b',
  ({ a, b, action, expected }) => {
    test(`returns ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);

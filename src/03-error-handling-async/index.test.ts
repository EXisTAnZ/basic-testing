// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const num = await resolveValue(1001);
    expect(num).toBe(1001);
    const str = await resolveValue('nights');
    expect(str).toBe('nights');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const myThrowError = () => throwError('La-li-lu-le-lo');
    expect(myThrowError).toThrow('La-li-lu-le-lo');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrowError(MyAwesomeError);
  });
});

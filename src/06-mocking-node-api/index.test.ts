// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const time = 500;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, time);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(time - 1);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  const time = 500;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toBeCalled();
    jest.advanceTimersByTime(2 * time);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'some.txt';
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toBeCalled();
    expect(path.join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'some.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'some.txt';
    const content = 'This is content of some.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(content);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBe(content);
  });
});

// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000000);
    const initialBalance = bankAccount.getBalance();
    expect(initialBalance).toBe(1000000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(999);
    const insFundsErr = () => bankAccount.withdraw(1000);
    expect(insFundsErr).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const fromAccount = getBankAccount(999);
    const toAccount = getBankAccount(1);
    const insFundsErr = () => fromAccount.transfer(1000, toAccount);
    expect(insFundsErr).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const fromAccount = getBankAccount(999);
    const toAccount = fromAccount;
    const insFundsErr = () => fromAccount.transfer(999, toAccount);
    expect(insFundsErr).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(999999);
    bankAccount.deposit(1);
    const curBalance = bankAccount.getBalance();
    expect(curBalance).toBe(1000000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(999999);
    bankAccount.withdraw(1);
    const curBalance = bankAccount.getBalance();
    expect(curBalance).toBe(999998);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(999);
    const toAccount = getBankAccount(1);
    fromAccount.transfer(999, toAccount);
    expect(fromAccount.getBalance()).toBe(0);
    expect(toAccount.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(999);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(lodash.random(1, 100, false))
      .mockReturnValueOnce(1); //for nor fail
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(999);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(lodash.random(1, 100, false))
      .mockReturnValueOnce(1); //for nor fail
    await bankAccount.synchronizeBalance();
    const curBalance = bankAccount.getBalance();
    expect(curBalance).not.toBe(999);
    expect(curBalance).toBeGreaterThanOrEqual(1);
    expect(curBalance).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(999);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(lodash.random(1, 100, false))
      .mockReturnValueOnce(0); //for fail
    const synch = bankAccount.synchronizeBalance();
    await expect(synch).rejects.toThrowError(SynchronizationFailedError);
  });
});

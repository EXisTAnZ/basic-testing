// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const route = '/users';
  const mockResponse = [
    {
      id: 1,
      name: 'Magomed Oziev',
      login: 'EXisTAnZ',
      age: 40,
      email: 'fakemail@mail.ru',
      role: 'admin',
      banned: false,
    },
    {
      id: 2,
      name: 'John Travis',
      login: 'Mortimer',
      age: 25,
      email: 'fake2mail@mail.ru',
      role: 'guest',
      banned: false,
    },
  ];

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn(() => Promise.resolve({ data: mockResponse }));
    mockAxios.create.mockReturnValue({
      defaults: { baseURL },
      get: mockGet,
    } as never);
    await throttledGetDataFromApi(route);
    expect(mockAxios.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn(() => Promise.resolve({ data: mockResponse }));
    mockAxios.create.mockReturnValue({
      defaults: { baseURL },
      get: mockGet,
    } as never);
    await throttledGetDataFromApi(route);
    jest.runAllTimers();
    expect(mockGet).toHaveBeenLastCalledWith(route);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn(() => Promise.resolve({ data: mockResponse }));
    mockAxios.create.mockReturnValue({
      defaults: { baseURL },
      get: mockGet,
    } as never);
    const response = await throttledGetDataFromApi(route);
    expect(response).toEqual(mockResponse);
  });
});

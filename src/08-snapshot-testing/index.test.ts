// Uncomment the code below and write your tests
import { generateLinkedList } from './index';
const arrFrom = (start: number, length: number): number[] =>
  Array(length)
    .fill(0)
    .map(() => start++);

const expectedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  },
};
describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(arrFrom(1, 5));
    expect(list).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(arrFrom(2, 5));
    expect(list).toMatchSnapshot();
  });
});

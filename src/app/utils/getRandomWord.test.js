const mockOneBeeSchoolList = ['apple', 'banana', 'cherry'];
const mockTwoBeeSchoolList = ['dog', 'elephant', 'fox'];
const mockThreeBeeSchoolList = ['grape', 'honeydew', 'kiwi'];

jest.mock('./oneBeeSchoolList.js', () => ({
  oneBeeSchoolList: ['apple', 'banana', 'cherry'],
}));
jest.mock('./twoBeeSchoolList', () => ({
  twoBeeSchoolList: ['dog', 'elephant', 'fox'],
}));
jest.mock('./threeBeeSchoolList.js', () => ({
  threeBeeSchoolList: ['grape', 'honeydew', 'kiwi'],
}));

import { getRandomWordFromList } from './getRandomWord';

describe('getRandomWordFromList', () => {
  it('returns the correct word from the oneBee list', () => {
    expect(getRandomWordFromList('oneBee')).toBe('apple');
    expect(getRandomWordFromList('oneBee')).toBe('banana');
    expect(getRandomWordFromList('oneBee')).toBe('cherry');
    expect(getRandomWordFromList('oneBee')).toBe('apple'); 
  });

  it('returns the correct word from the twoBee list', () => {
    expect(getRandomWordFromList('twoBee')).toBe('dog');
    expect(getRandomWordFromList('twoBee')).toBe('elephant');
    expect(getRandomWordFromList('twoBee')).toBe('fox');
    expect(getRandomWordFromList('twoBee')).toBe('dog'); 
  });

  it('returns the correct word from the threeBee list', () => {
    expect(getRandomWordFromList('threeBee')).toBe('grape');
    expect(getRandomWordFromList('threeBee')).toBe('honeydew');
    expect(getRandomWordFromList('threeBee')).toBe('kiwi');
    expect(getRandomWordFromList('threeBee')).toBe('grape'); 
  });

  it('throws an error for invalid list name', () => {
    expect(() => getRandomWordFromList('invalidList')).toThrow('Invalid list name');
  });

  it('throws an error for an untracked list name', () => {
    jest.mock('./getRandomWord', () => ({
      listIndices: {},
    }));
    expect(() => getRandomWordFromList('unknownList')).toThrow('Invalid list name');
  });
});

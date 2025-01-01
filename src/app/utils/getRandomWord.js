import { oneBeeSchoolList } from './oneBeeSchoolList.js';
import { twoBeeSchoolList } from './twoBeeSchoolList';
import { threeBeeSchoolList } from './threeBeeSchoolList.js';

const listIndices = {
  oneBee: 0,
  twoBee: 0,
  threeBee: 0,
};

export function getRandomWordFromList(listName) {
  let wordList;

  switch (listName) {
    case 'oneBee':
      wordList = oneBeeSchoolList;
      break;
    case 'twoBee':
      wordList = twoBeeSchoolList;
      break;
    case 'threeBee':
      wordList = threeBeeSchoolList;
      break;
    default:
      throw new Error('Invalid list name');
  }
  
  if (!(listName in listIndices)) {
    throw new Error('List not tracked');
  }

  const currentIndex = listIndices[listName];
  
  const word = wordList[currentIndex];
  listIndices[listName] = (currentIndex + 1) % wordList.length;

  return word;
}
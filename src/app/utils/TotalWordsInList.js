import { oneBeeSchoolList } from "../utils/oneBeeSchoolList";
import { twoBeeSchoolList } from "../utils/twoBeeSchoolList";
import { threeBeeSchoolList } from "../utils/threeBeeSchoolList";

export function getTotalWordsForList(listName) {
  const wordLists = {
    oneBee: oneBeeSchoolList,
    twoBee: twoBeeSchoolList,
    threeBee: threeBeeSchoolList,
  };

  const wordList = wordLists[listName];
  return wordList ? wordList.length : 0;
}

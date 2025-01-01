import axios from 'axios';

const API_KEY = '73adfb26-6b8c-4230-b09f-dd0817e820b9';
const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/sd2/json/`;

export const fetchWordData = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}/${word}?key=${API_KEY}`);
    console.log('API Response:', response.data);

    const wordData = response.data[0];
    if (!wordData) throw new Error('Word data is undefined or missing.');

    return {
      word: wordData.hwi?.hw.replace(/\*/g, '') || 'Word Not Found',
      definition: wordData.shortdef?.[0] || 'No definition available.',
      example: (() => {
        const senses = wordData.def?.[0]?.sseq || [];
        for (const senseGroup of senses) {
          for (const sense of senseGroup) {
            const dt = sense?.[1]?.dt || [];
            for (const entry of dt) {
              if (Array.isArray(entry[1])) {
                for (const vis of entry[1]) {
                  if (vis?.t) {
                    return vis.t.replace(/{it}|{\/it}/g, '');
                  }
                }
              }
            }
          }
        }
        return 'No example sentence.';
      })(),
    };
  } catch (error) {
    console.error('Error fetching word data:', error);
    return null;
  }
};
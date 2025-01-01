import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_COLLEGIATE_API_KEY;
const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`;

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

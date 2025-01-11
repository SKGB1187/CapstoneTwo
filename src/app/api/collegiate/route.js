import axios from 'axios';

const API_KEY = process.env.COLLEGIATE_API_KEY;
const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`;

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");
  
    if (!word) {
      return new Response(
        JSON.stringify({ error: "Word parameter is required." }),
        { status: 400 }
      );
    }
  
    try {
      const response = await axios.get(`${BASE_URL}/${word}?key=${API_KEY}`);
      const wordData = response.data[0];
      if (!wordData) throw new Error("Word data is undefined or missing.");
  
      const processedData = {
        word: wordData.hwi?.hw.replace(/\*/g, "") || "Word Not Found",
        definition: wordData.shortdef?.[0] || "No definition available.",
        example: (() => {
          const senses = wordData.def?.[0]?.sseq || [];
          for (const senseGroup of senses) {
            for (const sense of senseGroup) {
              const dt = sense?.[1]?.dt || [];
              for (const entry of dt) {
                if (Array.isArray(entry[1])) {
                  for (const vis of entry[1]) {
                    if (vis?.t) {
                      return vis.t.replace(/{it}|{\/it}/g, "");
                    }
                  }
                }
              }
            }
          }
          return "No example sentence.";
        })(),
      };
  
      return new Response(JSON.stringify(processedData), { status: 200 });
    } catch (error) {
      console.error("Error fetching word data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch word data." }),
        { status: 500 }
      );
    }
  }
  
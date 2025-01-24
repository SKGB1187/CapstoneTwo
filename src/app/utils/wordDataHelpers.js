/**
 * Extracts the example sentence from the API response data.
 * @param {Object} wordData - The raw word data from the API.
 * @returns {string} - The example sentence or a default message if not found.
 */
export function extractExampleSentence(wordData) {
    const senses = wordData?.def?.[0]?.sseq || [];
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
  }
  
  /**
   * Processes raw word data into a structured format.
   * @param {Object} wordData - The raw word data from the API.
   * @returns {Object} - Processed word data.
   */
  export function processWordData(wordData) {
    return {
      word: wordData?.hwi?.hw.replace(/\*/g, "") || "Word Not Found",
      definition: wordData?.shortdef?.[0] || "No definition available.",
      example: extractExampleSentence(wordData),
    };
  }
  
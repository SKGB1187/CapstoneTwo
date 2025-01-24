import axios from "axios";

const API_KEY = process.env.COLLEGIATE_API_KEY;
const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`;

/**
 * Fetches word data from the Collegiate Dictionary API.
 * @param {string} word - The word to fetch data for.
 * @returns {Promise<Object>} - The word data.
 * @throws {Error} - If the fetch operation fails.
 */
export async function fetchCollegiateWordData(word) {
  try {
    const response = await axios.get(`${BASE_URL}/${word}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching word data from API:", error);
    throw new Error("Failed to fetch word data from the API.");
  }
}

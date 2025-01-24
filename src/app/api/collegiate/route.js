import { fetchCollegiateWordData } from "../../services/collegiateService";
import { processWordData } from "../../utils/wordDataHelpers";

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
    // Fetch raw data from the service layer
    const rawWordData = await fetchCollegiateWordData(word);

    // Process the data using helper functions
    const processedData = processWordData(rawWordData[0]);

    return new Response(JSON.stringify(processedData), { status: 200 });
  } catch (error) {
    console.error("Error in Collegiate API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch word data." }),
      { status: 500 }
    );
  }
}

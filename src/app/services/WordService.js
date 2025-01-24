export async function fetchWordData(listName, word) {
    const endpoint =
      listName.toLowerCase() === "collegiate"
        ? "/api/collegiate"
        : "/api/elementary";
  
    try {
      const response = await fetch(`${endpoint}?word=${word}`);
      if (!response.ok) {
        throw new Error("Failed to fetch word data. Please try again.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error in fetchWordData:", error);
      throw error;
    };
  };
  
export async function fetchProgress(userId, listName) {
  try {
    const response = await fetch(`/api/getUserProgress?userId=${userId}&listName=${listName}`);
    if (!response.ok) {
      throw new Error(`Error fetching progress: ${response.statusText}`);
    }
    const progress = await response.json();

    return progress;
  } catch (error) {
    console.error("Error in fetchProgress:", error);
    throw error;
  };
};

export async function getWordStatus(userId, word, listName) {
  try {
    const response = await fetch(`/api/getWordStatus?userId=${userId}&word=${word}&listName=${listName}`);
    if (!response.ok) {
      throw new Error(`Error fetching word status: ${response.statusText}`);
    }
    const { status } = await response.json();

    return status;
  } catch (error) {
    console.error("Error in getWordStatus:", error);
    throw error;
  };
};

export async function saveProgress(userId, word, listName, status) {
  try {
    const response = await fetch(`/api/saveProgress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, word, listName, status }),
    });

    if (!response.ok) {
      throw new Error(`Error saving progress: ${response.statusText}`);
    }

    const updatedProgress = await response.json();
    return updatedProgress;
  } catch (error) {
    console.error("Error in saveProgress:", error);
    throw error;
  }
}
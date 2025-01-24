import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req) {
  try {
    console.log("In body of POST");

    const body = await req.json();
    console.log("Parsed body:", body);

    const { userId, word, listName, status } = body;

    if (!userId || !word || !listName || !status) {
      return new Response(
        JSON.stringify({ error: "userId, word, listName, and status are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const parsedUserId = parseInt(userId, 10);

    // Step 1: Check if the entry exists
    let progressEntry = await prisma.userProgress.findUnique({
      where: {
        userId_word_listName: {
          userId: parsedUserId,
          word,
          listName,
        },
      },
    });

    // Step 2: If no entry is found, create one
    if (!progressEntry) {
      console.log("No existing entry found. Creating a new one.");
      progressEntry = await prisma.userProgress.create({
        data: {
          userId: parsedUserId,
          word,
          listName,
          status,
          attempts: 0, // Start with 0 attempts for a new entry
        },
      });
    }

    // Step 3: Update the entry with the new status and increment attempts
    const updatedProgress = await prisma.userProgress.update({
      where: {
        id: progressEntry.id, // Use the primary key from the found or created entry
      },
      data: {
        status,
        attempts: {
          increment: 1,
        },
        updatedAt: new Date(),
      },
    });

    // Return the updated entry
    return new Response(JSON.stringify(updatedProgress), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving progress:", JSON.stringify(error, null, 2));
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

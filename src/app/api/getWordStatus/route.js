import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const word = searchParams.get("word");
  const listName = searchParams.get("listName");

  if (!userId || !word || !listName) {
    return new Response(
      JSON.stringify({ error: "userId, word, and listName are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const status = await prisma.userProgress.findUnique({
      where: {
        userId_word_listName: {
          userId: parseInt(userId),
          word,
          listName,
        },
      },
    });

    if (!status) {
      return new Response(
        JSON.stringify({ status: "not started" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: status.status }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching word status:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

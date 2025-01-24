import { oneBeeSchoolList } from "@/app/utils/oneBeeSchoolList";
import { twoBeeSchoolList } from "@/app/utils/twoBeeSchoolList";
import { threeBeeSchoolList } from "@/app/utils/threeBeeSchoolList";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const wordLists = {
  oneBee: oneBeeSchoolList,
  twoBee: twoBeeSchoolList,
  threeBee: threeBeeSchoolList,
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId"));
    const listName = searchParams.get("listName");

    if (!userId || !listName) {
      return new Response(
        JSON.stringify({ error: "userId and listName are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let progress = await prisma.userProgress.findMany({ where: { userId, listName } });

    if (progress.length === 0) {
      const wordList = wordLists[listName];
      if (!wordList) {
        return new Response(
          JSON.stringify({ error: `Word list for '${listName}' not found.` }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      await prisma.userProgress.createMany({
        data: wordList.flat().map((word) => ({
          userId,
          word,
          listName,
          status: "not started",
          attempts: 0,
        })),
      });

      progress = await prisma.userProgress.findMany({ where: { userId, listName } });
    }

    return new Response(JSON.stringify(progress), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching or initializing progress:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

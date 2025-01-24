'use client';

import BeePageComponent from "@/app/components/BeePage";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { fetchProgress } from "@/app/services/progressService";
import { getTotalWordsForList } from "@/app/utils/TotalWordsInList";

export default function ThreeBeePage() {
  const [progress, setProgress] = useState([]);
  const { data: session, status } = useSession();

  const listName = "threeBee";
  const totalWords = getTotalWordsForList(listName);

  const userId = session?.user?.id;

  const initializeProgress = useCallback(async () => {
    if (status === "authenticated" && session?.user) {
      try {
        const userId = session.user.id;
        const listName = "threeBee";
        const progressData = await fetchProgress(userId, listName);
        setProgress(progressData);
      } catch (error) {
        console.error("Error initializing progress:", error);
      }
    }
  }, [session, status]);

  useEffect(() => {
    initializeProgress();
  }, [initializeProgress]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <BeePageComponent
      spellingList="Three Bee Spelling List 2024"
      description="This list is for seventh and eighth-grade students in 2024."
      progress={progress}
      listName={listName}
      totalWords={totalWords}
      onProgressUpdate={initializeProgress}
      userId={userId}
    />
  );
};
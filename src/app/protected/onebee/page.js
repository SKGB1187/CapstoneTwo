'use client';

import BeePageComponent from "@/app/components/BeePage";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { fetchProgress } from "@/app/services/progressService";
import { getTotalWordsForList } from "@/app/utils/TotalWordsInList";

export default function OneBeePage() {
  const [progress, setProgress] = useState([]);
  const { data: session, status } = useSession();

  const listName = "oneBee";
  const totalWords = getTotalWordsForList(listName);

  const userId = session?.user?.id;

  const initializeProgress = useCallback(async () => {
    if (status === "authenticated" && userId) {
      try {
        const progressData = await fetchProgress(userId, listName);
        setProgress(progressData);
      } catch (error) {
        console.error("Error initializing progress:", error);
      }
    }
  }, [status, userId]);

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
      spellingList="One Bee Spelling List 2024"
      description="This list is for first, second, and third-grade students in 2024."
      progress={progress}
      listName={listName}
      totalWords={totalWords}
      onProgressUpdate={initializeProgress}
      userId={userId}
    />
  );
}

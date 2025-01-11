"use client";

import React, { useState } from "react";
import WordCard from "./WordCard";
import { getRandomWordFromList } from "../utils/getRandomWord";
import SpellingInput from "./SpellingInput";
import SummaryCard from "./SummaryCard";

export default function WordPracticeCollegiate({ listName }) {
  const [wordData, setWordData] = useState(null);
  const [typedWord, setTypedWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSpelling, setIsSpelling] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const fetchWord = async () => {
    try {
      const randomWord = getRandomWordFromList(listName);

      const response = await fetch(`/api/collegiate?word=${randomWord}`);
      if (!response.ok) {
        throw new Error("Failed to fetch word data.");
      }

      const wordInfo = await response.json();

      setWordData(wordInfo);
      setTypedWord("");
      setIsCorrect(null);
      setIsSpelling(false);
      setShowSummary(false);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  const handleInputChange = (e) => {
    setTypedWord(e.target.value);
  };

  const handleSubmit = () => {
    if (typedWord.toLowerCase() === wordData.word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowSummary(true);
    setIsSpelling(false);
  };

  const handleNextWord = () => {
    fetchWord();
  };

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <button className="btn btn-light" onClick={fetchWord}>
          Get a Word from {listName.charAt(0).toUpperCase() + listName.slice(1)}
        </button>
      </div>

      {wordData && !showSummary && (
        <>
          <WordCard
            wordData={wordData}
            isSpelling={isSpelling}
            handleSpellButtonClick={() => setIsSpelling(true)}
          />
          {isSpelling && (
            <SpellingInput
              wordData={wordData}
              typedWord={typedWord}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </>
      )}

      {showSummary && (
        <SummaryCard
          wordData={wordData}
          isCorrect={isCorrect}
          onNextWord={handleNextWord}
        />
      )}
    </div>
  );
}

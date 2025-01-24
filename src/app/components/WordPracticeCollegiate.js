'use client';

import React, { useReducer } from "react";
import WordCard from "./WordCard";
import { getRandomWordFromList } from "../utils/getRandomWord";
import SpellingInput from "./SpellingInput";
import SummaryCard from "./SummaryCard";
import ReviewCard from "./ReviewCard";
import { fetchWordData } from "../services/WordService";
import { saveProgress } from "../services/progressService";

const initialState = {
  wordData: null,
  typedWord: "",
  isCorrect: null,
  isSpelling: false,
  showSummary: false,
  error: null,
  skippedWord: null,
  showReviewCard: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_WORD_DATA":
      return {
        ...state,
        wordData: action.payload,
        typedWord: "",
        isCorrect: null,
        isSpelling: false,
        showSummary: false,
        error: null,
        skippedWord: null,
        showReviewCard: false,
      };
    case "SET_TYPED_WORD":
      return {
        ...state,
        typedWord: action.payload,
      };
    case "SET_IS_CORRECT":
      return {
        ...state,
        isCorrect: action.payload,
        showSummary: true,
        isSpelling: false,
      };
    case "TOGGLE_IS_SPELLING":
      return {
        ...state,
        isSpelling: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SKIPPED_WORD":
      return {
        ...state,
        skippedWord: action.payload,
        showReviewCard: true,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function WordPracticeCollegiate({ listName, onProgressUpdate, userId }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchWord = async () => {
    try {
      const randomWord = getRandomWordFromList(listName);
      const wordData = await fetchWordData("collegiate", randomWord);
      dispatch({ type: "SET_WORD_DATA", payload: wordData });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const handleInputChange = (e) => {
    dispatch({ type: "SET_TYPED_WORD", payload: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const isCorrect = state.typedWord.toLowerCase() === state.wordData.word.toLowerCase();
    dispatch({ type: "SET_IS_CORRECT", payload: isCorrect });

    try {
      await saveProgress(userId, state.wordData.word, listName, isCorrect ? "completed" : "review");
      if (onProgressUpdate) {
        onProgressUpdate();
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleSkipWord = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await saveProgress(userId, state.wordData.word, listName, "skipped");
      if (onProgressUpdate) {
        onProgressUpdate();
      }

      dispatch({ type: "SET_SKIPPED_WORD", payload: state.wordData.word });
      fetchWord();
    } catch (error) {
      console.error("Error skipping word:", error);
    }
  };

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <button className="btn btn-light" onClick={fetchWord}>
          Get a Word from {listName.charAt(0).toUpperCase() + listName.slice(1)}
        </button>
      </div>

      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}

      {state.showReviewCard && state.skippedWord && (
        <ReviewCard
          skippedWord={state.skippedWord}
          onDismiss={() => dispatch({ type: "SET_SKIPPED_WORD", payload: null })}
        />
      )}

      {state.wordData && !state.showSummary && (
        <>
          <WordCard
            wordData={state.wordData}
            isSpelling={state.isSpelling}
            handleSpellButtonClick={() =>
              dispatch({ type: "TOGGLE_IS_SPELLING", payload: true })
            }
            handleSkipWord={handleSkipWord}
          />
          {state.isSpelling && (
            <SpellingInput
              wordData={state.wordData}
              typedWord={state.typedWord}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </>
      )}

      {state.showSummary && (
        <SummaryCard
          wordData={state.wordData}
          isCorrect={state.isCorrect}
          onNextWord={fetchWord}
        />
      )}
    </div>
  );
}

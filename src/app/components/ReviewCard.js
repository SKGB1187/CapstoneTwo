import React, { useEffect } from "react";

const ReviewCard = ({ skippedWord, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="m-3 p-2 bg-dark text-light rounded">
      <p>
        You skipped the word: <strong>{skippedWord}</strong>
      </p>
      <p>Let's try the next word!</p>
    </div>
  );
};

export default ReviewCard;

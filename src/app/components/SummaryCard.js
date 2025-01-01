import React from 'react';

const SummaryCard = ({ wordData, isCorrect, onNextWord }) => {
  if (!wordData) return null;

  return (
    <div >
      <div className="p-3 mt-3 bg-dark rounded">
      <p className="text-warning">
        <strong>{isCorrect ? 'Nice Job!' : `Not quite, let\'s review this one:`}</strong>
      </p>
      <p className="text-warning">
        {isCorrect
          ? 'You spelled the word correctly!'
          : `The correct spelling is: ${wordData.word}`}
      </p>
      </div>

      <div className="p-3 mt-3 bg-dark rounded">
      <h3 className="text-warning">{wordData.word}</h3>
      <p className="text-warning"><strong>Definition:</strong> {wordData.definition}</p>
      <p className="text-warning"><strong>Example: </strong> {wordData.example || 'No example available.'}</p>
      
      
      <button className="btn btn-light btn-block mt-3" onClick={onNextWord}>
        Try Another Word
      </button>
    </div>
    </div>
  );
};

export default SummaryCard;

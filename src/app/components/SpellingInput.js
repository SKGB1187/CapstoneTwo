import React from 'react';
import { getStyledWord } from '../utils/getStyledWord';

export default function SpellingInput({ wordData, typedWord, handleInputChange, handleSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* Feedback Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          marginBottom: '10px',
        }}
      >
        {getStyledWord(wordData, typedWord)}
      </div>

      {/* Input and Button */}
      <div>
        <input
          type="text"
          value={typedWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            border: '1px solid gray',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleSubmit}
          className="btn btn-light"
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            borderRadius: '8px',
          }}
        >
          Check/Review Word
        </button>
      </div>
    </div>
  );
}


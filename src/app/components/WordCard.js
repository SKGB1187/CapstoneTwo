import React, { useState } from 'react';
import SpeakerButton from './SpeakerButton';

const WordCard = ({ wordData, isSpelling, handleSpellButtonClick, handleSkipWord }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!wordData) return null;

  return (
    <div>
      <h1 className="p-2 bg-dark text-light rounded">Let's Practice for the Spelling Bee!</h1>
      <p className="p-2 bg-dark text-light rounded">
        To use this application, make sure to have a speaker or headphones ready to hear the words you are practicing.
      </p>
      {!isSpelling ? (
        <>
          <ul>
            <li className="list-group-item m-2 rounded border border-dark">
              Click on the "What's the Word?" button below, to hear the word.
            </li>
            <li className="list-group-item m-2 rounded border border-dark">
              If you are not sure about the word, click on the definition button to hear the definition.
            </li>
            <li className="list-group-item m-2 rounded border border-dark">
              If you still need help, try clicking on the Sample Sentence button.
            </li>
            <li className="list-group-item m-2 rounded border border-dark">
              When you are ready to spell your word, click on the "Ready to Spell?" button.
            </li>
          </ul>
          <div>
            <SpeakerButton
              word={wordData.word}
              type="pronunciation"
              isSpeaking={isSpeaking}
              setIsSpeaking={setIsSpeaking}
            />
            <SpeakerButton
              word={wordData.definition}
              type="definition"
              isSpeaking={isSpeaking}
              setIsSpeaking={setIsSpeaking}
            />
            <SpeakerButton
              word={wordData.example}
              type="sentence"
              isSpeaking={isSpeaking}
              setIsSpeaking={setIsSpeaking}
            />
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-light me-2" onClick={handleSpellButtonClick}>
              Ready to Spell?
            </button>
            <button className="btn btn-light ms-2" onClick={handleSkipWord}>
              Skip Word
            </button>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default WordCard;

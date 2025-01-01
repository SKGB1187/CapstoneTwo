import { useState } from 'react';

const SpeakerButton = ({ word, type }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
    utterance.onend = () => setIsSpeaking(false);
  };

  return (
    <button className="m-2 btn btn-outline-dark border-3 btn-block" onClick={handleClick} disabled={isSpeaking}>
      {type === 'pronunciation'
        ? 'What\'s the word?'
        : type === 'definition'
        ? 'Definition'
        : 'Sample Sentence'}
    </button>
  );
};

export default SpeakerButton;

export const getStyledWord = (wordData, typedWord) => {
  if (!wordData) return null;

  const word = wordData.word.toLowerCase();
  const typed = typedWord.toLowerCase();

  return word.split('').map((char, index) => {
    let color = 'black';
    if (index < typed.length) {
      color = char === typed[index] ? 'green' : 'red';
    }

    return (
      <span key={index} style={{ color }}>
        {index < typed.length ? typed[index] : '_'}
      </span>
    );
  });
};

  
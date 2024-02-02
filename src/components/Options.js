// Options.js
import React, { useState } from 'react';

const Options = ({ incorrectAnswers, correctAnswer, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    handleAnswer(option);
  };

  return (
    <div className='options-container'>
      {incorrectAnswers.map((option, index) => (
        <button
          className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
          key={index}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}
      <button
        className={`option-button ${selectedAnswer === correctAnswer ? 'selected' : ''}`}
        onClick={() => handleOptionClick(correctAnswer)}
      >
        {correctAnswer}
      </button>
    </div>
  );
};

export default Options;

// Question.js
import React from 'react';
import Options from './Options';

const Question = ({ item, handleAnswer, handleNext }) => {
  return (
    <div className='question-container'>
      <h3>{item.question.text}</h3>
      <Options incorrectAnswers={item.incorrectAnswers} correctAnswer={item.correctAnswer} handleAnswer={handleAnswer} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Question;

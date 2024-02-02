// ScoreCard.js
import React from 'react';

const ScoreCard = ({ score, timer, restartQuiz }) => {
  return (
    <div  className="score-card">
      <h2>Your Score: {score}</h2>
      <p>Time Spent: {timer} seconds</p>
      <button onClick={restartQuiz}>Retake Quiz</button>
    </div>
  );
};

export default ScoreCard;

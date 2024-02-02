// Quiz.js
import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../api';
import Question from './Question';
import ScoreCard from './ScoreCard';
import '../styles.css';

const Quiz = () => {
  const categories = [
    'All',
    'Music',
    'Sport & Leasure',
    'Film & TV',
    'Arts & Literature',
    'History',
    'Society & Culture',
    'Science',
    'Geography',
    'Food & Drink',
    'General knowledge'
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const formatQuery = (value) => {
    return value.toLowerCase().replace(/\s/g, '_').replace(/\&/g, 'and');
  };

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const formattedCategory = formatQuery(selectedCategory);
        const formattedDifficulty = formatQuery(selectedDifficulty);
        const fetchedQuestions = await fetchQuestions(formattedCategory, formattedDifficulty);
        setQuestions(fetchedQuestions); 
      } catch (error) {

      }
    };

    fetchQuizData();
  }, [selectedCategory, selectedDifficulty]);

  const handleAnswer = (selectedOption) => {
    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date()); 
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion === questions.length - 1) {
      const endTime = new Date();
      const timeDifference = Math.round((endTime - startTime) / 1000); 
      setTimer(timeDifference);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setTimer(0);
  };

  return (
    <div className='quiz-container'>
      {!quizStarted ? (
        <div className='select-container'>
          <label>
            Category:
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Difficulty:
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
              {difficulties.map((difficulty, index) => (
                <option key={index} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : currentQuestion < questions.length ? (
          <Question
            item={questions[currentQuestion]}
            handleAnswer={handleAnswer}
            handleNext={handleNext}
          />
      ) : (
        <ScoreCard score={score} timer={timer} restartQuiz={restartQuiz} />
      )}
    </div>
  );
};

export default Quiz;

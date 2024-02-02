// api.js
import axios from 'axios';

const fetchQuestions = async (category, difficulty) => {
  try {
    let queryParams = {};

    if (category !== 'All') {
      queryParams.category = category;
    }

    if (difficulty !== 'All') {
      queryParams.difficulty = difficulty;
    }

    const response = await axios.get('https://the-trivia-api.com/v2/questions', {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; 
  }
};

export { fetchQuestions };

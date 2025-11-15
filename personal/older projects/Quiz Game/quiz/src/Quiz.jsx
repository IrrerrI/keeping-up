
import { useState } from 'react';
import './App.css'

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const nextQuestion = currentQuestion + 1;
  const handleClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    } else {
      alert('incorrect')
    }

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert('Quiz ended!');
    }
  };
  const quizData = [
    {
      question: 'who is chunjaman?',
    options: ['uzair', 'warosha', 'kanra','para'],
    correctOption: 'uzair',
  },
  {
    question: 'cosmic is waht?',
  options: ['trash', 'good', 'fun','yay'],
  correctOption: 'trash',
}
  ]
  return (
    <div>
      <h1>Quiz</h1>
      {currentQuestion < quizData.length ? (
        <div>
          <h2>{quizData[currentQuestion].question}</h2>
          <ul>
            {quizData[currentQuestion].options.map((option, index) => (
              <li key={index} onClick={() => handleClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Quiz

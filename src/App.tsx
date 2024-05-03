import React, { useEffect, useState } from 'react';
import './App.css';
import questionsJson from './question.json';
import questionsruJson from './questionsru.json';

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(questionsruJson)
  }, []);

  const handleAnswer = (selectedOption: string) => {
    setSelectedAnswer(selectedOption);
    const correctOption = questions[currentQuestionIndex].answer;
    if (selectedOption === correctOption) {
      setCorrectAnswer(selectedOption);
    } else {
      setCorrectAnswer(null);
    }
  
    setTimeout(() => {
      resetQuestion();
    }, 2500); 
  };

  const resetQuestion = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (randomIndex === currentQuestionIndex);

    setCurrentQuestionIndex(randomIndex);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  console.log(questions?.length)

  return (
    <div className="container">
      <p className='question'>{questions[currentQuestionIndex]?.question}</p>
      <div className="options">
        {currentQuestionIndex >= 0 && questions.length > 0 && ['A', 'B', 'C', 'D'].map((option) => (
          <button
            key={option}
            className={`option-button ${selectedAnswer === option ? 'selected' : ''} ${correctAnswer === questions[currentQuestionIndex].answer && questions[currentQuestionIndex].answer === option  ? 'correct' : ''} ${correctAnswer !== questions[currentQuestionIndex].answer && selectedAnswer === option  ? 'incorrect' : ''}`}
            onClick={() => handleAnswer(option)}
          >
            {questions[currentQuestionIndex][option]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;


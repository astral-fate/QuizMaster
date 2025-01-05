import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'MongoDB Filter Representation',
      code: '{$or: [{"day": {$gt: 12, $lt: 15}}, {"hour": 56.5}]}',
      options: [
        'day <= 15 and day >= 12 or hour = 56.5',
        '(day <= 15 and day > 12) or hour = 56.5',
        'day <= 15 or day > 12 or hour = 56.5',
        'None of the above'
      ],
      correct: 1,
      explanation: "The filter uses $gt (greater than) and $lt (less than) with an OR condition"
    },
    {
      id: 2,
      question: 'MongoDB Filter Representation',
      code: '{Sor: [{"day": {$gt: 12, Slte: 15}}, {"hour": 56.5}]}',
      options: [
        'day <= 15 and day >= 12 or hour = 56.5',
        '(day <= 15 and day > 12) or hour = 56.5',
        'day <= 15 or day > 12 or hour = 56.5',
        'None of the above'
      ],
      correct: 3,
      explanation: "The filter uses invalid operators 'Sor' and 'Slte' instead of '$or' and '$lte'"
    },
    {
      id: 3,
      question: 'JSON Document Validation',
      code: `"Iname": "Justin"
"Iname": "Mark",
"ssn": "11341102",
"salary": 4070.00,
"superssn": "1117600",
"phone": 12345,
"phone": 7998710`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON format: missing enclosing braces, duplicate keys, and incorrect formatting"
    },
    // ... [rest of the questions array continues with all 19 questions] ...
  ];

  const handleAnswer = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
    setShowFeedback(true);
  };

  const getScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(questionIndex => {
      if (answers[parseInt(questionIndex)] === questions[parseInt(questionIndex)].correct) {
        correct++;
      }
    });
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setAnswers({});
    setShowFeedback(false);
  };

  if (showResults) {
    const score = getScore();
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You scored {score} out of {questions.length} ({Math.round((score/questions.length) * 100)}%)
                </AlertDescription>
              </Alert>
              <Button onClick={restartQuiz} className="w-full">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const userAnswer = answers[currentQuestion];
  const isCorrect = userAnswer === question.correct;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{question.question}</h3>
              {question.code && (
                <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto">
                  <code>{question.code}</code>
                </pre>
              )}
            </div>
            
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswer === index ? (isCorrect ? "default" : "destructive") : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                >
                  {userAnswer === index && (
                    isCorrect ? 
                    <CheckCircle2 className="mr-2 h-4 w-4" /> :
                    <XCircle className="mr-2 h-4 w-4" />
                  )}
                  {index === question.correct && showFeedback && (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  )}
                  {option}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>
                  {question.explanation}
                </AlertDescription>
              </Alert>
            )}

            {showFeedback && (
              <Button 
                onClick={nextQuestion} 
                className="w-full"
              >
                {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next Question'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});
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
    {
      id: 4,
      question: 'JSON Document Validation',
      code: `{
  "fname": "Ali",
  "minit": 'n',
  "lname": "Mohamed",
  "ssn": "1123411102",
  "salary": 56000.00
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Single quotes are not valid in JSON - must use double quotes"
    },
    {
      id: 5,
      question: 'JSON Document Validation',
      code: `{
  "ssn": 523,
  "address": "Cairo",
  "Address": "Giza",
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON due to trailing comma after last property"
    },
    {
      id: 6,
      question: 'MongoDB Filter Validity',
      code: 'Which of the following is not a valid MongoDB filter?',
      options: [
        '{ "dno": {$gte: 14, $lte: 16} }',
        '{ $and: [{"dno": 14}, {salary: 7.5}] }',
        '{ $or: [{"dno": {$gte: 14, $lte: 16}}, {salary: 7.5}] }',
        'None of the above'
      ],
      correct: 3,
      explanation: "All listed filters are valid MongoDB queries"
    },
    {
      id: 7,
      question: 'MongoDB Filter Representation',
      code: '{Sand: [{"dno": {Snot: {Seq: 8}}}, {"month": {Shin: [5, 9, 10]}}, {"gender": "F"}]}',
      options: [
        'dno != 8 and month is not in {5, 9, 10} and gender = F',
        'dno != 8 and month is in {5, 9, 10} and gender = F',
        'dno = 8 and month is not in {5, 9, 10} and gender = F',
        'None of the above'
      ],
      correct: 3,
      explanation: "The filter uses invalid operators 'Sand', 'Snot', 'Seq', and 'Shin' instead of proper MongoDB operators"
    },
    {
      id: 8,
      question: 'JSON Document Validation',
      code: `"ssn": "112341102"
"bdate": DATE("1968-01-12")
"address": "2342 May", "Atlanta", "GA"
"salary": 46500.00,
"superssn": "11541100"`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON format: missing enclosing braces, DATE() is not valid JSON, and incorrect array formatting"
    },
    {
      id: 9,
      question: 'MongoDB Filter Representation',
      code: '{ "day": {Sgte: 14, $lte: 16} }',
      options: [
        'day > 14 and day <= 16',
        'day >= 14 and day < 16',
        'day >= 14 and day <= 16',
        'None of the above'
      ],
      correct: 3,
      explanation: "The filter uses invalid operator 'Sgte' instead of '$gte'"
    },
    {
      id: 10,
      question: 'MongoDB Filter Validity',
      options: [
        '{ $or: [{"dno": {$gte: 14, $lte: 16}}, {salary: 25000}] }',
        '{ $or: [{"dno": {$gte: 14, 16}}, {salary, $lte: 25000}] }',
        '{ $or: [{"dno": {14, $lte: 16}}, {$gte: 25000}] }',
        'None of the above'
      ],
      correct: 0,
      explanation: "Only the first option is a valid MongoDB filter with correct operator syntax"
    },
    {
      id: 11,
      question: 'JSON Document Validation',
      code: `{
  "fname": "Justin",
  "lname": "Mark",
  "ssn": "11341102",
  "salary": 4070.00,
  "superssn": "1117600",
  "phone": 12345,
  "phone": 7998710
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON due to duplicate 'phone' key"
    },
    {
      id: 12,
      question: 'MongoDB Filter Representation',
      code: '{$or: [{"day": {$gt: 12, $ltc: 15}}, {"hour": 56.5}]}',
      options: [
        'day <= 15 and day >= 12 or hour = 56.5',
        '(day <= 15 and day > 12) or hour = 56.5',
        'day <= 15 or day > 12 or hour = 56.5',
        'None of the above'
      ],
      correct: 3,
      explanation: "The filter uses invalid operator '$ltc' instead of '$lt' or '$lte'"
    },
    {
      id: 13,
      question: 'JSON Document Validation',
      code: `{
  "fname": "Justin",
  "Iname": "Mark",
  "ssn": "111111102",
  "salary": 40000.00,
  "superssn": "111111100",
  "phone": 12345,
  "is a manager": TRUE
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON: space in key name 'is a manager' and TRUE should be lowercase true"
    },
    {
      id: 14,
      question: 'JSON Document Validation',
      code: `{
  "fname": "Justin",
  "Iname": "Mark",
  "ssn": "11341102",
  "salary": 4070.00,
  "superssn": "1117600",
  "phone": 12345,
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON due to trailing comma after last property"
    },
    {
      id: 15,
      question: 'JSON Document Validation',
      code: `{
  "fname": "Mohamed",
  "lname": "Mahmod",
  "ssn": "11165102",
  "salary": 4600.00,
  "superssn": "761100",
  "dno": NULL,
  "phone": 12345,
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON: NULL should be lowercase null and there's a trailing comma"
    },
    {
      id: 16,
      question: 'JSON Document Validation',
      code: `{
  "ssn": "112341102",
  "bdate": DATE("1968-01-12"),
  "address": "2342 May", "Atlanta", "GA",
  "salary": 46500.00,
  "superssn": "11541100",
}`,
      options: ['Correct', 'Not correct'],
      correct: 1,
      explanation: "Invalid JSON: DATE() is not valid JSON, incorrect array formatting, and trailing comma"
    },
    {
      id: 17,
      question: 'MongoDB Filter Representation',
      code: '{ "day": {Sgtc: 14, Slte: 16} }',
      options: [
        'day > 14 and day <= 16',
        'day >= 14 and day < 16',
        'day >= 14 and day <= 16',
        'None of the above'
      ],
      correct: 3,
      explanation: "The filter uses invalid operators 'Sgtc' and 'Slte' instead of '$gte' and '$lte'"
    },
    {
      id: 18,
      question: 'MongoDB Filter Validity',
      options: [
        '{ $or: [{"dno": {$gte: 14, $lte: 16}}, {salary: 25000}] }',
        '{ $or: [{"dno": {$gte: 14, 16}}, {salary, $lte: 25000}] }',
        '{ $or: [{"dno": {14, $lte: 16}}, {$gte: 25000}] }',
        'None of the above'
      ],
      correct: 0,
      explanation: "Only the first option is a valid MongoDB filter with correct operator syntax"
    },
    {
      id: 19,
      question: 'Runtime Error',
      code: 'Runtime error 217 at 0040A300',
      options: [
        'Memory access violation',
        'Division by zero',
        'Invalid operation',
        'None of the above'
      ],
      correct: 0,
      explanation: "Runtime error 217 typically indicates a memory access violation"
    }
  ];

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
    setShowFeedback(true);
  };

  const getScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(questionIndex => {
      if (answers[questionIndex] === questions[questionIndex].correct) {
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
      <Card className="w-full max-w-2xl mx-auto">
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
    );
  }

  const question = questions[currentQuestion];
  const userAnswer = answers[currentQuestion];
  const isCorrect = userAnswer === question.correct;

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
              {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next
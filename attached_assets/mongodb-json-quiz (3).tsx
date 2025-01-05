import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// ... [Previous code remains the same until the return statement] ...

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
              {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;

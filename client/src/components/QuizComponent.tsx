import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/lib/quizzes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete?: (score: number, total: number) => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = quiz.questions[currentQuestion];
  const score = answers.filter((answer, idx) => answer === quiz.questions[idx].correctAnswer).length;

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), quiz.questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  if (showResults) {
    const finalScore = score + (answers[quiz.questions.length - 1] === quiz.questions[quiz.questions.length - 1].correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="bg-card border-border p-8">
        <div className="text-center space-y-6">
          <div className={`text-6xl font-bold ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
            {percentage}%
          </div>
          <h3 className="text-2xl font-bold">
            {passed ? '🎉 Quiz Passed!' : '📚 Keep Learning'}
          </h3>
          <p className="text-lg text-muted-foreground">
            You got {finalScore} out of {quiz.questions.length} questions correct
          </p>

          {/* Review Answers */}
          <div className="space-y-4 text-left mt-8">
            <h4 className="font-bold text-lg">Review Your Answers:</h4>
            {quiz.questions.map((q, idx) => {
              const isCorrect = answers[idx] === q.correctAnswer;
              return (
                <div key={q.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-2">{q.question}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{q.options[answers[idx]]}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Correct answer: <span className="text-green-400">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground italic">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleRestart}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border p-8">
      <div className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="font-mono text-primary">{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div>
          <h3 className="text-xl font-bold mb-6">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded border-2 transition-all ${
                  selectedAnswer === idx
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === idx
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}
                  >
                    {selectedAnswer === idx && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
}

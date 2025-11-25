import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { generateQuiz } from '../services/gemini';
import { QuizQuestion } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Quiz() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (cityName) {
        setLoading(true);
        const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const quizData = await generateQuiz(capitalizedCity);

        try {
          let parsed;
          const jsonMatch = quizData.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          } else {
            parsed = JSON.parse(quizData);
          }

          setQuestions(parsed.questions || []);
          setAnswers(new Array(parsed.questions?.length || 0).fill(null));
        } catch (error) {
          console.error('Error parsing quiz:', error);
          setQuestions([]);
        }

        setLoading(false);
      }
    };

    fetchQuiz();
  }, [cityName]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1]);
      } else {
        calculateScore(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const calculateScore = (finalAnswers: (number | null)[]) => {
    let correctCount = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Quiz Unavailable</h2>
          <p className="text-gray-700 mb-6">
            We couldn't load the quiz at this time. Please try again later.
          </p>
          <button
            onClick={() => navigate(`/city/${cityName}`)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Article
          </button>
        </div>
      </div>
    );
  }

  const capitalizedCity = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : '';

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Trophy className="w-24 h-24 text-amber-600 mx-auto mb-6" />
            </motion.div>

            <h1 className="text-4xl font-bold text-amber-900 mb-4">Quiz Complete!</h1>

            <div className="bg-gradient-to-r from-red-100 to-amber-100 rounded-2xl p-8 mb-8">
              <p className="text-6xl font-bold text-red-700 mb-2">{percentage}%</p>
              <p className="text-xl text-amber-900">
                You scored {score} out of {questions.length}
              </p>
            </div>

            {percentage >= 80 && (
              <p className="text-lg text-green-700 font-semibold mb-6">
                Excellent! You're a Kathputli expert!
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-lg text-amber-700 font-semibold mb-6">
                Great job! You know your Kathputli heritage well!
              </p>
            )}
            {percentage < 60 && (
              <p className="text-lg text-gray-700 font-semibold mb-6">
                Keep learning! There's so much more to discover!
              </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate(`/city/${cityName}/tutorial`)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Learn to Create
              </button>
              <button
                onClick={() => navigate(`/city/${cityName}`)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Back to Article
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/city/${cityName}`)}
          className="flex items-center gap-2 text-amber-900 hover:text-red-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Article
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl shadow-2xl p-6 mb-8 text-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{capitalizedCity} Kathputli Quiz</h1>
            <span className="text-amber-100 font-semibold">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-white h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-2xl font-bold text-amber-900 mb-8">{currentQ.question}</h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-red-600 bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAnswer === index
                          ? 'border-red-600 bg-red-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswer === index && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-lg text-gray-800 flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

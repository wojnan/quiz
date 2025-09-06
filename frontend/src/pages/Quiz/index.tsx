import React, { useState, useEffect } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";

type Answer = {
  answer_id: number;
  answer: string;
  is_correct: boolean;
};

type Question = {
  question_id: number;
  content: string;
  answers: Answer[];
};

type RenderTimeProps = {
  remainingTime: number;
};

const renderTime = ({ remainingTime }: RenderTimeProps) => {
  if (remainingTime === 0) {
    return <div className="timer">Time's over</div>;
  }
  return <div className="timer">{remainingTime}s</div>;
};

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectness, setShowCorrectness] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Load 3 random questions when quiz starts
  useEffect(() => {
    const loadGame = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/api/games/start", {
          lobbyId: 1,
        });
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to start game", error);
      }
    };
    loadGame();
  }, []);

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

   const confirmAnswerAndNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer first!");
      return;
    }

    // Show correctness before moving
    setShowCorrectness(true);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowCorrectness(false);
        setIsTimeUp(false);
      } else {
        alert("Quiz finished!");
      }
    }, 1000); // 1s pause to show correct/wrong highlight
  };

  return (
    <div>
      <DrawerMenu />
      <h1>Quiz</h1>
      <p>{currentQuestion.content}</p>

      <CountdownCircleTimer
        key={currentIndex}
        isPlaying={!isTimeUp && !showCorrectness}
        duration={30}
        colors={["#00FF00", "#F7B801", "#FF0000"]}
        colorsTime={[30, 15, 0]}
        onComplete={() => {
          setIsTimeUp(true);
          confirmAnswerAndNext();
        }}
      >
        {renderTime}
      </CountdownCircleTimer>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {currentQuestion.answers.map((a) => {
          let bgColor = "#1f1f1f"; // default
          let textColor = "white";

          if (selectedAnswer === a.answer_id) {
            bgColor = showCorrectness
              ? a.is_correct
                ? "#28a745"
                : "#dc3545"
              : "#444"; // highlight selected
          } else if (showCorrectness && a.is_correct) {
            bgColor = "#2ecc71"; // show correct
          }

          return (
            <button
              key={a.answer_id}
              onClick={() => {
                if (!showCorrectness && !isTimeUp) setSelectedAnswer(a.answer_id);
              }}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                padding: "10px",
                border: "1px solid #444",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {a.answer}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={confirmAnswerAndNext}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>

      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Quiz;

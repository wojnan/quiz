import React, { useState } from "react"
import DrawerMenu from "../../components/DrawerMenu";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

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
    console.log("Quiz component rendered")
    const buttons = ["One", "Two", "Three", "Four"];
    const [isTimeUp, setIsTimeUp] = useState(false);
    return (
        <div>
            <DrawerMenu />
            <h1>Quiz</h1>
            <p> Question </p>
            <CountdownCircleTimer isPlaying duration={30} 
                colors={["#007706", "#F7B801", "#A30000"]} 
                colorsTime={[30, 15, 0]}
                onComplete={() => { setIsTimeUp(true);
                 return { shouldRepeat: false };}}>
                {renderTime}
            </CountdownCircleTimer>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10"}}>
                {buttons.map((label, index) => (
                <button key={index} disabled={isTimeUp}>{label}</button>))}
            </div>

        </div>
    );
};


export default Quiz
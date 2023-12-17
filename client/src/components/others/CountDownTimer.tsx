import React, { useState, useEffect } from "react";

interface Props {
  initialSeconds: number;
  whenTimeIsUp?: () => void;
}

export const CountdownTimer: React.FC<Props> = ({ initialSeconds, whenTimeIsUp = () => {} }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      whenTimeIsUp();
    }
  }, [seconds]);

  return (
    <div style={{ display: "inline" }}>
      {(Math.floor(seconds / 60).toString().length < 2 ? "0" : "") + Math.floor(seconds / 60)}:
      {((seconds % 60).toString().length < 2 ? "0" : "") + (seconds % 60)}
    </div>
  );
};

import React, { useState, useEffect } from "react";

interface Props {
  initialSeconds: number;
}

export const CountdownTimer: React.FC<Props> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);

  return <div>{seconds} seconds remaining</div>;
};

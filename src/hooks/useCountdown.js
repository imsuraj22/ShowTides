import { useEffect, useState } from "react";
import { DateTime } from "luxon";

function useCountdown(targetTime) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateCountdown() {
      const now = DateTime.now();
      const diff = targetTime.diff(now, ["hours", "minutes", "seconds"]).toObject();

      if (diff.hours < 0 || diff.minutes < 0 || diff.seconds < 0) {
        setTimeLeft("Already passed");
        return;
      }

      setTimeLeft(
        `${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(
          diff.seconds
        )}s`
      );
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}

export default useCountdown;

import { useEffect, useState } from "react";

function getTimePeriod() {
  const date = new Date();
  const options = { timeZone: "Asia/Manila" };
  const localTime = new Date(date.toLocaleString("en-US", options));

  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();

  if (hours === 0 && minutes >= 0 && minutes < 60) {
    return "It's midnight here ✨";
  }
  if (hours >= 1 && hours <= 4) {
    return "It's late night here 🌌";
  }
  if (hours === 5 && minutes >= 0 && minutes < 30) {
    return "It's dawn here 🌄";
  }
  if (hours === 5 && minutes >= 30 && minutes < 60) {
    return "It's early morning here 🌅";
  }
  if (hours >= 6 && hours <= 8) {
    return "It's early morning here 🌞";
  }
  if (hours >= 9 && hours <= 10) {
    return "It's morning here 🌞";
  }
  if (hours === 11 && minutes >= 0 && minutes < 60) {
    return "It's late morning here 🌞";
  }
  if (hours === 12 && minutes >= 0 && minutes < 60) {
    return "It's noon here ☀️";
  }
  if (hours >= 13 && hours <= 14) {
    return "It's early afternoon here ☀️";
  }
  if (hours >= 15 && hours <= 16) {
    return "It's afternoon here ☀️";
  }
  if (hours === 17 && minutes >= 0 && minutes < 30) {
    return "It's late afternoon here 🌇";
  }
  if ((hours === 17 && minutes >= 30) || (hours >= 18 && hours <= 19)) {
    return "It's dusk here 🌆";
  }
  if (hours >= 20 && hours <= 21) {
    return "It's early evening here 🌙";
  }
  if (hours >= 22 && hours <= 23) {
    return "It's evening here 🌃";
  }
  return "It's late evening here 🌃";
}

const useTimePeriod = () => {
  const [timePeriod, setTimePeriod] = useState(getTimePeriod());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePeriod(getTimePeriod());
    }, 60000);

    return () => clearInterval(interval);
  });

  return timePeriod;
};

export default useTimePeriod;
